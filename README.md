Farah Hussain — Portfolio & AI Chatbot
What it is

A personal portfolio website for Farah Hussain, final-year BSCS student and AI Fluency intern at FlyRank, showcasing projects, skills, and certificates — with a built-in AI chatbot that visitors can ask about my work.

Who it's for: recruiters, mentors, and reviewers who want a quick, honest look at what I've built and how I work.

Live links
Portfolio: https://farahhussain159-create.github.io
Chatbot backend: https://farahhussain159-create-github-io.vercel.app
Setup (for a stranger to reproduce)
Clone this repo: git clone https://github.com/farahhussain159-create/farahhussain159-create.github.io.git
This is a static site — plain HTML/CSS/JS. No build step needed; open index.html in a browser to view locally, or serve with any static server (e.g. npx serve .)
For the chatbot backend (separate Vercel project):
Requires a Groq API key (GROQ_API_KEY environment variable)
Model used: openai/gpt-oss-20b
Deploy the backend folder to Vercel; set the env variable in Vercel project settings
Point the frontend's chatbot widget fetch URL to your deployed backend URL
Usage example
Visit the site → go to the Contact page → type a question into the "Ask about my work" chat widget, e.g. "What projects has Farah built?" → chatbot replies using project/skills context.
Architecture (simple sketch)
Visitor Browser
   |
   |--> GitHub Pages (static site: Home / About / Projects / Contact)
   |
   '--> Contact page chatbot widget
          |
          '--> Vercel serverless function (API route)
                 |
                 '--> Groq API (openai/gpt-oss-20b) --> reply --> shown in widget
v2 eval results
Hardening checkpoint (Week 9 "Break Your Own Site") tested: empty input, garbage input, double-submit on chatbot, dead links, fresh/incognito browser
Fixed: chatbot response truncation bug (max_tokens increased 300 → 600)
Added: meta description + Open Graph tags on all 4 pages, <main> landmark for accessibility, custom favicon and OG share image
Score: accessibility/color-contrast check ~85/100
Limitations
Chatbot does not detect or gracefully flag gibberish/nonsense input — it will still attempt a reply instead of asking for clarification
Site runs on a free Vercel Hobby tier + free GitHub Pages hosting — no SLA/uptime guarantee
Chatbot knowledge is limited to what's manually included in its context; it doesn't dynamically pull live project updates
Built with AI — transparency note

I built this with Claude: used it for drafting page copy, debugging the chatbot's serverless backend, and reasoning through the identity/design system (colors, fonts, layout). I personally tested the hardening checklist above, fixed the truncation bug, and verified all live links and accessibility tags myself before publishing.
