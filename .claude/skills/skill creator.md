---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
---

# Skill Creator

A skill for creating new skills and iteratively improving them.

At a high level, the process of creating a skill goes like this:

- Decide what you want the skill to do and roughly how it should do it
- Write a draft of the skill
- Create a few test prompts and run claude-with-access-to-the-skill on them
- Help the user evaluate the results both qualitatively and quantitatively
- Rewrite the skill based on feedback
- Repeat until satisfied

## Claude.ai-specific instructions

**Running test cases**: No subagents. For each test case, read the skill's SKILL.md, then follow its instructions yourself, one at a time.

**Reviewing results**: Present results directly in the conversation. Show the prompt and output for each test case. Ask for feedback inline.

**Benchmarking**: Skip quantitative benchmarking. Focus on qualitative feedback.

**Description optimization**: Requires `claude` CLI — skip on Claude.ai.

**Packaging**: Use `package_skill.py` if available, then present the `.skill` file.

**Updating an existing skill**:
- Preserve the original name
- Copy to `/tmp/skill-name/` before editing (installed path may be read-only)
- Stage in `/tmp/` first, then copy to output directory

## Creating a skill

### Capture Intent
1. What should this skill enable Claude to do?
2. When should it trigger?
3. What's the expected output format?

### Write the SKILL.md
- **name**: Skill identifier
- **description**: When to trigger + what it does (make it "pushy" to avoid undertriggering)
- Instructions in markdown

### Skill anatomy
```
skill-name/
├── SKILL.md (required)
└── Bundled Resources (optional)
    ├── scripts/
    ├── references/
    └── assets/
```

### Test Cases
Come up with 2-3 realistic test prompts. Run them yourself following the skill's instructions. Present outputs to the user and ask for feedback.

## Improving the skill
- Generalize from feedback — don't overfit to examples
- Keep the skill lean — remove what isn't pulling its weight
- Explain the *why* behind instructions, not just the what
- Iterate: improve → rerun → get feedback → repeat

## Packaging
```bash
python -m scripts.package_skill <path/to/skill-folder>
```
