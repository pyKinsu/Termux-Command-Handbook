import re

FILES = {
    "Basics": "/Basics",
    "Lesson1": "/Lesson1",
    "Lesson2": "/Lesson2",
    "Lesson3": "/Lesson3",
    "Lesson4": "/Lesson4",
    "Lesson6": "/Lesson6",
    "Lesson7": "/Lesson7",
    "Lesson8": "/Lesson8",
    "Lesson9": "/Lesson9",
}

for dir_name, href in FILES.items():
    path = f'src/app/(chapters)/{dir_name}/page.tsx'
    with open(path, "r") as f:
        text = f.read()

    # 1. Add imports after the last existing import line (first "use client"
    # block ends at the blank line following the imports).
    import_block_end = text.index("\n\n", text.index('"use client"'))
    new_imports = (
        '\nimport { CategoryJumpNav } from "@/components/CategoryJumpNav";'
        '\nimport { LessonPagination } from "@/components/LessonPagination";'
        '\nimport { slugify } from "@/lib/utils";'
    )
    text = text[:import_block_end] + new_imports + text[import_block_end:]

    # 2. Insert <CategoryJumpNav /> right before the Categories Section comment.
    text = text.replace(
        "      {/* Categories Section */}",
        "      <CategoryJumpNav categories={categories} />\n\n      {/* Categories Section */}",
        1,
    )

    # 3. Give each category header an id + scroll margin.
    text = text.replace(
        '<div key={category} className="mb-16 sm:mb-20">',
        '<div key={category} id={slugify(category)} className="mb-16 sm:mb-20 scroll-mt-32">',
        1,
    )

    # 4. Give each command card a stable id matching the search index.
    old_card = (
        "                      key={idx}\n"
        '                      className="group relative rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden"\n'
    )
    new_card = (
        "                      key={idx}\n"
        f'                      id={{slugify(`{dir_name}-${{cmd.title || cmd.command}}`)}}\n'
        '                      className="group relative rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden scroll-mt-32"\n'
    )
    count = text.count(old_card)
    assert count == 1, f"expected 1 card match in {path}, got {count}"
    text = text.replace(old_card, new_card, 1)

    # 5. Insert <LessonPagination /> right before the final closing tags.
    old_end = "        </div>\n      </div>\n    </div>\n  );\n}\n"
    new_end = (
        "        </div>\n      </div>\n\n"
        "      {/* Lesson Navigation */}\n"
        '      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20">\n'
        f'        <LessonPagination currentHref="{href}" />\n'
        "      </div>\n"
        "    </div>\n  );\n}\n"
    )
    assert text.endswith(old_end), f"unexpected file ending in {path}"
    text = text[: -len(old_end)] + new_end

    with open(path, "w") as f:
        f.write(text)
    print("updated", path)
