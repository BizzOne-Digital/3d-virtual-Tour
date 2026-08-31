"""
Move an MP4's `moov` atom in front of `mdat` so a browser can start playing
before the whole file has arrived. This is what `ffmpeg -movflags +faststart`
does; it is a lossless byte rearrangement, not a re-encode.

Chunk offset tables inside `moov` (`stco` 32-bit, `co64` 64-bit) hold absolute
file positions, so every entry is shifted by the size of the relocated atom.

Usage: python scripts/faststart.py <input.mp4> <output.mp4>
"""

from __future__ import annotations

import struct
import sys

CONTAINERS = {b"moov", b"trak", b"mdia", b"minf", b"stbl", b"edts", b"udta"}


def read_atoms(data: bytes, start: int, end: int):
    """Yield (kind, atom_start, body_start, atom_end) for one level."""
    pos = start
    while pos + 8 <= end:
        size = struct.unpack(">I", data[pos : pos + 4])[0]
        kind = data[pos + 4 : pos + 8]
        body = pos + 8
        if size == 1:  # 64-bit extended size
            size = struct.unpack(">Q", data[pos + 8 : pos + 16])[0]
            body = pos + 16
        elif size == 0:  # extends to end of file
            size = end - pos
        if size < 8:
            raise ValueError(f"bad atom size {size} for {kind!r} at {pos}")
        yield kind, pos, body, pos + size
        pos += size


def patch_offsets(buf: bytearray, base: int, start: int, end: int, shift: int) -> int:
    """Walk the moov tree, adding `shift` to every chunk offset. Returns count."""
    patched = 0
    for kind, atom_start, body, atom_end in read_atoms(bytes(buf), start, end):
        if kind in CONTAINERS:
            patched += patch_offsets(buf, base, body, atom_end, shift)
        elif kind in (b"stco", b"co64"):
            count = struct.unpack(">I", buf[body + 4 : body + 8])[0]
            table = body + 8
            width = 4 if kind == b"stco" else 8
            fmt = ">I" if kind == b"stco" else ">Q"
            limit = (1 << 32) - 1 if kind == b"stco" else (1 << 64) - 1
            for i in range(count):
                at = table + i * width
                value = struct.unpack(fmt, buf[at : at + width])[0] + shift
                if value > limit:
                    raise ValueError(
                        f"{kind.decode()} offset overflow; file needs a co64 rewrite"
                    )
                buf[at : at + width] = struct.pack(fmt, value)
            patched += count
    return patched


def faststart(src: str, dst: str) -> None:
    data = open(src, "rb").read()
    top = list(read_atoms(data, 0, len(data)))
    order = [k.decode(errors="replace") for k, *_ in top]
    print(f"atoms: {' '.join(order)}")

    moov = next((a for a in top if a[0] == b"moov"), None)
    mdat = next((a for a in top if a[0] == b"mdat"), None)
    if moov is None or mdat is None:
        raise SystemExit("not a plain MP4: missing moov or mdat")

    if moov[1] < mdat[1]:
        raise SystemExit("moov already precedes mdat; nothing to do")

    _, moov_start, moov_body, moov_end = moov
    moov_bytes = bytearray(data[moov_start:moov_end])
    if b"cmov" in moov_bytes[:4096]:
        raise SystemExit("compressed moov (cmov) is not supported")

    shift = len(moov_bytes)
    # Offsets inside the copied atom are relative to the same tree, so patch in place.
    n = patch_offsets(moov_bytes, 0, moov_body - moov_start, len(moov_bytes), shift)
    print(f"moov: {shift:,} bytes, patched {n:,} chunk offsets by +{shift:,}")

    with open(dst, "wb") as out:
        for kind, atom_start, _body, atom_end in top:
            if kind == b"moov":
                continue
            if kind == b"mdat":
                out.write(moov_bytes)  # moov lands immediately before the media
            out.write(data[atom_start:atom_end])

    print(f"wrote {dst}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    faststart(sys.argv[1], sys.argv[2])
