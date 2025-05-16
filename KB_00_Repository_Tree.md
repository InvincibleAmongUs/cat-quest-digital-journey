
```markdown
# KB_00_Repository_Tree.md - The Full Directory Structure

This file outlines the directory structure of the "Cat Quest Digital Journey" project, based on the files visible in the current context.

```
.
├── .github/
│   └── workflows/
│       └── ci.yml  (*Assumed based on Part 1.E.1, content to be generated if specified*)
├── public/
│   ├── favicon.ico
│   ├── manifest.json (*Assumed based on Part 1.C.3, content to be generated if specified*)
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── accessibility/
│   │   │   └── TextToSpeech.tsx
│   │   ├── achievements/
│   │   │   └── BadgeCard.tsx
│   │   ├── ai/
│   │   │   ├── AIConceptExplainer.tsx
│   │   │   ├── AIContentSummarizer.tsx
│   │   │   └── AIQuizGenerator.tsx
│   │   ├── auth/
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── AuthForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── CurrentModule.tsx
│   │   │   ├── ModuleList.tsx
│   │   │   └── ProgressOverview.tsx
│   │   ├── games/
│   │   │   ├── DataDetective.tsx
│   │   │   ├── FilePathRace.tsx
│   │   │   ├── HardwareHunt.tsx
│   │   │   └── filePathRace/
│   │   │       ├── FilePathNavigator.tsx
│   │   │       ├── FilePathRace.tsx
│   │   │       ├── FolderGrid.tsx
│   │   │       ├── FolderItem.tsx
│   │   │       └── initialFileSystem.ts
│   │   ├── knowledgebase/
│   │   │   ├── ChapterViewer.tsx
│   │   │   ├── DynamicChapterViewer.tsx
│   │   │   └── KnowledgeImage.tsx
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx
│   │   │   └── AppHeaderKnowledgeLink.tsx
│   │   ├── lessons/
│   │   │   ├── ContentBlockRenderer.tsx
│   │   │   ├── ImagePlaceholder.tsx
│   │   │   ├── InlineQuiz.tsx
│   │   │   ├── LessonContent.tsx
│   │   │   ├── LessonContentDisplay.tsx
│   │   │   └── blocks/
│   │   │       ├── FigureBlock.tsx
│   │   │       ├── GameBlock.tsx
│   │   │       ├── HeadingBlock.tsx
│   │   │       ├── ImageBlock.tsx
│   │   │       ├── TableBlock.tsx
│   │   │       └── TextBlock.tsx
│   │   ├── mascot/
│   │   │   └── DataDragon.tsx
│   │   ├── quiz/
│   │   │   ├── QuizQuestion.tsx
│   │   │   └── QuizSection.tsx
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── use-toast.ts
│   │   └── user/
│   │       └── UserProgressTracker.tsx
│   │   ├── ErrorBoundary.tsx (*Assumed based on Part 1.A.3*)
│   │   └── QuizModal.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── data/
│   │   └── moduleOneData.ts
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── images/ (*Contains various PNGs, structure not fully detailed here*)
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── knowledgebase/
│   │   ├── Chapter Images and tables List.txt
│   │   ├── Chapter-1.txt
│   │   ├── Chapter-2.txt
│   │   ├── Chapter-3.txt
│   │   ├── Chapter-4.txt
│   │   ├── Chapter-5.txt
│   │   ├── Chapter-6.txt
│   │   ├── Chapter-7.txt
│   │   └── lessons/
│   │       ├── index.ts
│   │       ├── lesson1.ts
│   │       ├── lesson2.ts
│   │       ├── lesson3.ts
│   │       ├── lesson4.ts
│   │       ├── lesson5.ts
│   │       └── types.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── LessonEditor.tsx
│   │   │   ├── ModuleEditor.tsx
│   │   │   ├── QuizEditor.tsx
│   │   │   └── UsersManagement.tsx
│   │   ├── games/
│   │   │   ├── DataDetectivePage.tsx
│   │   │   ├── FilePathRacePage.tsx
│   │   │   └── HardwareHuntPage.tsx
│   │   ├── AIToolsPage.tsx
│   │   ├── AchievementsPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DynamicKnowledgeBasePage.tsx
│   │   ├── GamesPage.tsx
│   │   ├── Index.tsx
│   │   ├── KnowledgeBasePage.tsx
│   │   ├── LessonPage.tsx
│   │   ├── Login.tsx
│   │   ├── ModuleDetail.tsx
│   │   ├── ModulesPage.tsx
│   │   ├── NotFound.tsx
│   │   ├── Profile.tsx
│   │   └── TermSelectionPage.tsx
│   ├── services/
│   │   ├── ContentService.ts
│   │   └── DeepseekService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── api/
│   │   │   ├── index.ts
│   │   │   ├── lessonApi.ts
│   │   │   ├── moduleApi.ts
│   │   │   └── quizApi.ts
│   │   ├── gamification.ts
│   │   ├── images/ (*Contains many PNGs related to chapters, structure not fully detailed here*)
│   │   ├── knowledgeBase.ts
│   │   └── textParser.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── routes.tsx
│   ├── vite-env.d.ts
│   └── vite-raw-imports.d.ts
├── supabase/
│   ├── config.toml
│   ├── functions/
│   │   ├── _shared/
│   │   │   └── cors.ts
│   │   ├── check-badges/
│   │   │   └── index.ts
│   │   ├── deepseek-proxy/
│   │   │   └── index.ts
│   │   ├── fetch-dynamic-content/
│   │   │   └── index.ts
│   │   └── populate-initial-data/
│   │       └── index.ts
│   └── check-badges/ (*Seems like a duplicate of supabase/functions/check-badges, based on file list*)
│       └── index.ts
├── .env (*Sensitive, not for direct inclusion*)
├── .env.example
├── .gitignore
├── Lessons.md
├── README.md
├── Repo.md
├── Temptsconfig.json (*Possibly tsconfig.json or a temp file*)
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── t1sconfig.json (*Primary editable tsconfig as per current context*)
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```
```
