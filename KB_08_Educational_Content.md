
```markdown
# KB_08_Educational_Content.md - Educational Content Structure & Implementation

This document describes how educational content (lessons, quizzes, knowledge base articles) is structured and implemented in the "Cat Quest Digital Journey" application.

## Lesson Content Structure

Lessons are primarily defined as structured data objects in TypeScript files located in `src/knowledgebase/lessons/`.

*   **Core Definition File:** `src/knowledgebase/lessons/types.ts`
    *   Defines the `LessonData` interface, which includes:
        *   `id` (number): Unique identifier for the lesson.
        *   `moduleId` (number): Identifier for the module this lesson belongs to.
        *   `title` (string): The title of the lesson.
        *   `description` (string): A brief description of the lesson.
        *   `blocks` (AnyContentBlock[]): An array of content blocks that make up the lesson content. `AnyContentBlock` is a union type for various block types (text, heading, image, figure, table, quiz, game).
        *   `quizQuestions` (array): An array of objects, each defining a quiz question with its options and the correct answer index.
        *   `hasQuiz` (boolean): Indicates if the lesson has an associated quiz.
    *   Defines interfaces for each content block type (e.g., `TextBlock`, `ImageBlock`, `HeadingBlock`).

*   **Individual Lesson Files:** `src/knowledgebase/lessons/lessonX.ts` (e.g., `lesson1.ts`, `lesson2.ts`)
    *   Each file exports a `LessonData` object for a specific lesson.
    *   **Content Blocks (`blocks` array):**
        *   **`type: "heading"`**: For section titles within the lesson. `content: { text: string, level: 1 | 2 | 3 }`.
        *   **`type: "text"`**: For paragraphs of text. `content: string`.
        *   **`type: "image"`**: For displaying images. `content: { src: string, alt: string, caption?: string, isTable?: boolean }`.
            *   `src` paths can be external URLs or local paths (e.g., `/src/utils/images/ch1_figure_1_3_information_processing_cycle.png`). Local paths are resolved by Vite.
            *   `isTable: true` is a custom hint if an image visually represents tabular data.
        *   **`type: "figure"`**: For figures that might have specific chapter references (handled by `FigureBlock.tsx`). `content: { chapterId: number, reference: string, caption?: string }`.
        *   **`type: "table"`**: For tables, potentially also referencing images that depict tables (handled by `TableBlock.tsx`). `content: { chapterId: number, reference: string, caption?: string }`.
        *   **`type: "game"`**: To embed a game block. `content: { gameType: string, gameId: string }`.
        *   **`type: "quiz"`**: This block type is defined but `ContentBlockRenderer.tsx` currently returns `null` for it, indicating quizzes are handled at a higher level (e.g., by `LessonContent.tsx` or `LessonPage.tsx` based on `lesson.hasQuiz`).
    *   **Quiz Questions (`quizQuestions` array):**
        *   Each question object has `question` (string), `options` (array of strings), and `correctAnswer` (number, 0-indexed).

*   **Aggregation:** `src/knowledgebase/lessons/index.ts`
    *   Imports individual lesson data objects.
    *   Exports them as an array (`term1Lessons`) and a map (`lessonsMap`) for easier access.

*   **Static Data Source:** `src/data/moduleOneData.ts`
    *   Appears to be another source of structured lesson data, potentially for a specific module, used by `LessonContentDisplay.tsx`. The relationship/overlap with `src/knowledgebase/lessons/` should be clarified for consistency. It might be an older way of storing data or data for a specific part of the app.

## Dynamic Lesson Implementation & Content Display

*   **Content Rendering:**
    *   `src/components/lessons/ContentBlockRenderer.tsx`: Takes an `AnyContentBlock` object and dynamically renders the appropriate React component for that block type (e.g., `TextBlock.tsx`, `ImageBlock.tsx`). This is the core mechanism for displaying structured lesson content.
*   **Lesson Page Display:**
    *   `src/pages/LessonPage.tsx`: The main page for displaying a lesson. It likely fetches or receives `LessonData` for the current lesson ID.
    *   Uses `src/components/lessons/LessonContent.tsx` or `src/components/lessons/LessonContentDisplay.tsx` to render the lesson.
*   **`LessonContent.tsx`:**
    *   Takes full `LessonData` as a prop.
    *   Renders the lesson title and iterates through `lesson.blocks`, passing each block to `ContentBlockRenderer`.
    *   If `lesson.hasQuiz` is true and the quiz is started, it renders quiz questions using `QuizQuestion.tsx`.
    *   Handles lesson completion logic and navigation to previous/next lessons.
*   **`LessonContentDisplay.tsx`:**
    *   Seems to be an alternative or complementary way to display lesson content.
    *   It attempts to load structured content from `moduleOneData` (static import).
    *   It also has a fallback to render Markdown content using `ReactMarkdown` if `markdownContent` prop is provided. This suggests a dual system or a transition path for content.
    *   Provides navigation and a "Take Quiz" button.

## Static Knowledge Base (Text Files)

*   **Content Files:** `src/knowledgebase/Chapter-X.txt`
    *   These files seem to hold the raw textual content for a more traditional, static knowledge base.
*   **Asset List:** `src/knowledgebase/Chapter Images and tables List.txt`
    *   Likely a manifest mapping image/table references in the `.txt` files to actual image filenames.
*   **Viewer Component:** `src/components/knowledgebase/ChapterViewer.tsx`
    *   **Functionality:** Displays content from a `Chapter-X.txt` file.
    *   **Loading:** Uses `loadChapterFromFile(chapterId)` (from `src/utils/knowledgeBase.ts`) to fetch and parse the chapter content. This utility likely reads the `.txt` file and possibly uses the "Chapter Images and tables List.txt" to resolve image/table references.
    *   **Rendering:**
        *   Splits chapter content by `\n\n` to render paragraphs.
        *   Displays figures and tables listed in the parsed chapter data using `ImagePlaceholder.tsx`.
    *   **Navigation:** Provides "Previous/Next Chapter" buttons.
*   **Page:** `src/pages/KnowledgeBasePage.tsx`
    *   The main page for the static knowledge base.
    *   Likely uses `ChapterViewer.tsx` to display the content of the selected chapter.
    *   Handles routing for different chapters (e.g., `/knowledge-base/:chapterId`).
*   **Dynamic Knowledge Base Page:** `src/pages/DynamicKnowledgeBasePage.tsx`
    *   This page, along with `src/components/knowledgebase/DynamicChapterViewer.tsx`, suggests an effort to create a more interactive or richly formatted knowledge base, possibly using the structured `LessonData` format or a similar dynamic approach rather than plain text files.

**Overall Content Strategy:**
The application appears to have two main ways of handling educational content:
1.  **Structured Lessons (`lessonX.ts`):** Rich, interactive content defined as TypeScript objects, rendered dynamically using `ContentBlockRenderer`. These support various block types and integrated quizzes.
2.  **Static Knowledge Base Chapters (`Chapter-X.txt`):** Simpler, text-based content, potentially supplemented by externally listed images/tables, rendered by `ChapterViewer`.

The "Dynamic Knowledge Base" components suggest a potential convergence or an advanced version of the static knowledge base.

## Quiz & Game Functionality

*   **Quiz Implementation (Integrated with Lessons):**
    *   **Data:** Quiz questions are part of the `LessonData` object in `lessonX.ts` files.
    *   **Display in `LessonContent.tsx`:** When a quiz is started, `LessonContent.tsx` maps over `lesson.quizQuestions` and renders each using `src/components/quiz/QuizQuestion.tsx`.
    *   `QuizQuestion.tsx`: Displays a single question, its options, and handles answer selection.
    *   **State Management:** `LessonContent.tsx` manages selected answers and quiz completion state.
*   **Quiz Modal (`src/components/QuizModal.tsx`):**
    *   A standalone modal for presenting quizzes.
    *   Can be triggered with a `quizId` (currently uses sample questions if `questionsData` prop isn't provided, indicating a potential for fetching quiz data by ID).
    *   Manages its own state for current question, selected answers, and score.
    *   Calculates score and calls `onClose` with points awarded.
*   **Game Functionality:**
    *   **Game Pages:** `src/pages/games/HardwareHuntPage.tsx`, `FilePathRacePage.tsx`, `DataDetectivePage.tsx`.
    *   **Game Components:**
        *   `src/components/games/HardwareHunt.tsx`, `FilePathRace.tsx`, `DataDetective.tsx`.
        *   `src/components/games/filePathRace/` contains components specific to the File Path Race game.
    *   **Lesson Integration:** The `type: "game"` content block in `LessonData` allows embedding games within lessons, handled by `src/components/lessons/blocks/GameBlock.tsx`.
    *   **Data Source for Games:**
        *   `src/components/games/filePathRace/initialFileSystem.ts`: Provides initial data for the File Path Race game.
        *   Other games likely have their own data sources or configuration, possibly within their components or fetched from `games` table in Supabase (which has a `content: jsonb` column).
    *   `GamesPage.tsx`: A central page to list or access available games.
```
