FILES = [
    "Lesson7",
    "Lesson8",
    "Lesson9",
]

for dir_name in FILES:
    path = f'src/app/(chapters)/{dir_name}/page.tsx'
    with open(path, "r") as f:
        text = f.read()

    import_marker = '"use client";'
    new_imports = (
        '\nimport { CommandSyntax } from "@/components/CommandSyntax";'
        '\nimport { TermuxApiBadge } from "@/components/TermuxApiBadge";'
    )
    idx = text.index(import_marker) + len(import_marker)
    text = text[:idx] + new_imports + text[idx:]

    old_box = (
        '<span className="text-muted-foreground">$ </span>\n'
        "                              {cmd.command}\n"
    )
    new_box = (
        '<span className="text-muted-foreground">$ </span>\n'
        "                              <CommandSyntax command={cmd.command} />\n"
    )
    count = text.count(old_box)
    assert count == 1, f"expected 1 command box match in {path}, got {count}"
    text = text.replace(old_box, new_box, 1)

    old_desc = (
        "                        {/* Description */}\n"
        '                        <p className="text-sm text-muted-foreground">\n'
        "                          {cmd.description}\n"
        "                        </p>\n"
    )
    new_desc = (
        "                        <TermuxApiBadge command={cmd.command} />\n\n"
        "                        {/* Description */}\n"
        '                        <p className="text-sm text-muted-foreground">\n'
        "                          {cmd.description}\n"
        "                        </p>\n"
    )
    count = text.count(old_desc)
    assert count == 1, f"expected 1 description match in {path}, got {count}"
    text = text.replace(old_desc, new_desc, 1)

    with open(path, "w") as f:
        f.write(text)
    print("updated", path)
