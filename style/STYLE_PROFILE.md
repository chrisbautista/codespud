# Style Profile — Codespud Blog (Chris Bautista)

**Genre:** Personal tech blog — how-to tutorials, "things I learned / mistakes I made" posts, tool round-ups, and the occasional personal/news note.
**Samples analyzed:** ~24 posts spanning 2006–2025 (read 11 in full). Evidence weighted toward the consistent core voice; era differences noted where they matter.
**Built:** 2026-06-27.

---

## 1. Voice in one paragraph

Chris writes like a friendly senior dev leaning over your shoulder — first person, self-deprecating, and openly still-learning. The blog is explicitly framed as a **learning journal** ("This is my learning journal"; "I learn more when creating an article than I do at studying intentionally"), so posts are honest about mistakes ("Five common Javascript mistakes **I am guilty of**", "I feel foolish whenever I commit this next error"). The tone is warm and casual, leans on direct reader address ("If you're like me…", "read on!"), parenthetical asides, and a quick sign-off at the end ("Cheers!", "Happy coding!", "Enjoy!"). Modern posts add pop-culture analogies and puns; older posts are looser and dotted with emoticons — but the same self-aware, encouraging teacher runs through all of it.

## 2. The three most distinctive fingerprints

1. **Confessional, mistake-first teaching.** He leads with his own errors and confusion rather than authority. "I am guilty of this mistake"; "It took me forever to find the issue"; "Do you see my error?"; "I am the most undisciplined person I know." The reader is a peer, not a student.
2. **The wink-and-aside in parentheses.** Asides do the joke-work and the hedging. "(Right next to 'refactor that one function' and 'actually read the WCAG guidelines.')"; "(Spoiler: it's always missing.)"; "(if only!)"; "(hehehe)". Often a punchline lands *inside* the parens.
3. **The warm sign-off.** Almost every post ends on a short, upbeat send-off, frequently under a "## Wrapping up" / "## Wrap-Up" heading: "Cheers!", "Happy coding!", "Happy coding, and happy (inclusive) building!", "Enjoy!", "Voila!", sometimes literally signed "potato".

## 3. Sentence mechanics

- **Length & rhythm:** Mostly short-to-medium declaratives, often run in staccato sequences. "Errors in code are normal." / "This is more confusing than problematic." / "Most of these are easy to fix." He'll deliberately fragment for emphasis: "But nuance? Context? The wild variety of user needs?"
- **Fragments for punch:** Used sparingly but on purpose — "Or at least, it should be." / "No sweat." / "Well, almost."
- **Colon-as-drumroll:** Sets up a payoff with a colon. "But here's the thing: the web is for everyone." / "Let's face it—they're slow, expensive…"
- **Conjunction openers:** Comfortable starting sentences with "But", "And", "So", "Then". "But I am stubborn too. So this year…"
- **Rhetorical questions to the reader:** "Do you see my error?", "Why use this you say…", "What's yours?", "Curious how all these tools… come together?"

## 4. Punctuation & formatting tics

- **Em-dash** (`—`) for interruptions and reveals, heavily: "searching for a semicolon in a haystack"; "let's face it—they're slow". Also uses spaced hyphens the same way in older posts ("I make resolutions every year - and every year - I fall short").
- **Parentheses** constantly, for asides, hedges, and jokes (see fingerprint #2).
- **Inline code in backticks** for every keyword, value, attribute, function: `const`, `===`, `for...of`, `this`, `pointer-events: none`. Near-universal in technical posts.
- **Bold for the takeaway phrase**, not whole sentences — a mnemonic or rule gets bolded: "**'Key IN the value OF'**".
- **Emoji / emoticons** for warmth, used lightly: 😁 🎉 in modern posts; 🙂 😀 in 2006–2009 posts. Never more than a couple per post.
- **Exclamation points** for enthusiasm, especially in intros, CTAs, and sign-offs: "read on!", "Enjoy!", "Cheers!". Not overused mid-paragraph.
- **Blockquotes** to open and sometimes close a post with a relevant quote (e.g., a Debra Ruh quote bookending the AI accessibility post), and to cite MDN/docs verbatim.

## 5. Structure & scaffolding

- **Intro pattern:** A relatable framing or confession, then a one-line "in this post I will…" statement. "In this post, I will list some of the mistakes I've encountered." Modern posts often open with a pull-quote first.
- **Table of contents** with in-page anchor links for any multi-section post (numbered list linking to `<h2 id="…">` headings). He hand-writes `<h2 id="...">` HTML when he needs the anchor.
- **Numbered, named sections** — "## 1. Basic Discriminated Union", "### 1. Microsoft Accessibility Insights + Copilot". Listicle skeletons ("Five…", "Ten…", "CSS Snippets I Use 90% of The Time").
- **Code-block → italic explanation** rhythm in code-heavy posts: a snippet, then an *italicized* gloss of what it does and when to use it.
- **Resource links as bullet lists** under each subtopic — he's generous with outbound links to docs (MDN, official docs, Vue School, etc.), often several per section.
- **Closing heading:** "## Wrapping up" or "## Wrap-Up" almost every time, summarizing the takeaway in 2–4 sentences and ending on the send-off.
- **HTML comment scratchpad** at the top of drafts — he leaves his outline/brainstorm in `<!-- ... -->` (e.g., "I love CSS / I hate repeating myself / I am hoarder"). Internal, but very him.

## 6. Vocabulary & diction

- **Plain, conversational register.** Avoids academic or buzzword-dense prose. Explains jargon when he introduces it ("If you don't know what that is either, then you were me at the beginning").
- **Hedge-and-honest qualifiers:** "To be honest…", "In my opinion…", "My take is…", "I think…", "I am guilty of…".
- **Signature casual connectors:** "Let's be honest:", "Here's the thing:", "let's face it", "So that's it!", "Like so:".
- **Encouraging second person:** "Choose whichever way you want", "Feel free to…", "Check it out if you're not quite sure where to start", "go ahead".
- **Self-identifiers:** "as a programmer", "as a front-end developer", "veteran programmer, addicted gamer, clueless photographer and novice writer". The "potato" / Codespud persona.

## 7. Rhetorical devices

- **Self-deprecation as credibility.** He earns trust by admitting fault first.
- **Analogy to make the abstract concrete** — vivid similes that turn an abstract idea into something tangible ("like searching for a semicolon in a haystack", "about as helpful as a screen door on a submarine").
- **Direct address & invitation** — ends posts asking the reader to comment, share, or try it ("What's yours?", "please don't hesitate to mention it in your comments").
- **"I tried everything" narrative** — walks through a real debugging story in first person, including the dead ends, before revealing the fix (the React radio-button equality bug is a model example).

## 8. ANTI-PATTERNS — what Chris never does

- **Never writes from detached authority.** No "One must ensure…" / "It is widely regarded…". If a rule is stated, it's framed as *his* hard-won lesson.
- **Never corporate or buzzword-y.** Avoids "leverage synergies", "best-in-class", "robust solutions" as empty filler. (He'll say "robust, maintainable code" only when it's literally true of the code.)
- **No long, multi-clause academic sentences.** Breaks ideas into short sentences instead.
- **Doesn't bold whole sentences or over-format.** Bold is reserved for a single key term/mnemonic.
- **Never cold or clinical in the close.** A post without a warm sign-off would not be his.
- **Doesn't pretend to be an expert.** Frequently says "I can not say I am an expert", "I am proficient enough to earn a living", "newbie", "to be honest I got lost quite early".
- **Avoids emoji spam.** Warmth is signaled with one or two, not a string (except a celebratory "🎉🎉🎉" on a New Year post — reserved for genuinely celebratory moments).
- **Never drops a code snippet without explaining it** in plain language right after.

## 9. WRITING CHECKLIST — to sound like Chris

1. Open with a relatable confession or framing, then state plainly what the post will cover.
2. Write first person. Admit your own mistakes and confusion as the teaching device.
3. Put jokes, hedges, and side-notes in parentheses. Land at least one punchline inside parens.
4. For technical posts: backtick every keyword/value; snippet → *italic* explanation; link generously to official docs in bullet lists.
5. Add a table of contents with anchor links if there are 4+ sections; number and name the sections.
6. Use one apt analogy per major point — a vivid simile that clarifies, never crowding out the substance.
7. Address the reader directly. Invite them to try it, choose for themselves, or comment.
8. Sprinkle warmth: 1–2 emoji max, the odd exclamation in intro/CTA/close.
9. Close under a "Wrapping up" heading: 2–4 sentence takeaway, then a short upbeat sign-off ("Cheers!", "Happy coding!").

## 10. Era notes (since this profile covers the whole blog)

- **2006–2009 (personal/news era):** Looser grammar and occasional typos, more emoticons (🙂😀), Filipino context (Typhoon Ondoy, local references), exclamation-heavy enthusiasm, "Voila!", sometimes signed "potato". Posts are shorter tips, link round-ups, and life updates.
- **2022–2025 (technical-tutorial era):** More polished and structured (TOC, headed sections, real code blocks), heavier on puns and vivid similes, longer (1,000–1,900 words), but the same self-deprecating, link-generous, warm-sign-off DNA.
- **Constant across both:** learning-journal framing, confession-first teaching, parenthetical asides, direct reader address, and the closing send-off.

---

## Manual Corrections

*(User edits below outrank the auto-analysis above and survive every refresh. Add your fixes here.)*
- Occasional self-deprecating talk. Admits mistakes but does not put himself down. Uses experience as credibility.
- Varies sentence length. 
- Close with a good title for last section instead of always using "Wrapping up" as a title. 