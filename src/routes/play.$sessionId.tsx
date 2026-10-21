import { createFileRoute, notFound } from "@tanstack/react-router";
import { GameLayout } from "@/components/GameLayout";
import { clockQuestions, pairs, quizzes, statements } from "@/data/games";
import { GAME_META, getSession } from "@/data/sessions";
import { ClockGame } from "@/games/ClockGame";
import { MatchGame } from "@/games/MatchGame";
import { QuizGame } from "@/games/QuizGame";
import { TrueFalseGame } from "@/games/TrueFalseGame";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/play/$sessionId")({
  loader: ({ params }) => {
    const session = getSession(params.sessionId);
    if (!session) throw notFound();
    return { session };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${GAME_META[loaderData.session.game].name} · Chapter 0${loaderData.session.number} · Récré` : "Chapter unavailable · Récré";
    const d = loaderData ? `${GAME_META[loaderData.session.game].blurb} Replay chapter 0${loaderData.session.number}.` : "This chapter is unavailable.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Play,
});

function Play() {
  const { session } = Route.useLoaderData();
  const { record } = useProgress();
  const onFinish = (s: number, t: number) => record(session.id, s, t);
  const id = session.id;

  let game;
  switch (session.game) {
    case "quiz": game = <QuizGame key={id} questions={quizzes[id] ?? []} onFinish={onFinish} />; break;
    case "match": game = <MatchGame key={id} pairs={pairs[id] ?? []} onFinish={onFinish} />; break;
    case "clock": game = <ClockGame key={id} questions={clockQuestions[id] ?? []} onFinish={onFinish} />; break;
    case "truefalse": game = <TrueFalseGame key={id} statements={statements[id] ?? []} onFinish={onFinish} />; break;
  }

  return <GameLayout session={session}>{game}</GameLayout>;
}
