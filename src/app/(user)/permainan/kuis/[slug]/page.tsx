import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getQuizTopicBySlug, QUIZ_TOPICS } from "@/data/quizTopics";
import QuizSessionView from "@/components/user/QuizSessionView";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return QUIZ_TOPICS.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getQuizTopicBySlug(slug);

  if (!topic) {
    return {
      title: "Kuis Tidak Ditemukan | SIGMA",
    };
  }

  return {
    title: `Kuis: ${topic.title} | SIGMA`,
    description: topic.description,
    alternates: {
      canonical: `https://sigmaplatform.vercel.app/permainan/kuis/${topic.slug}`,
    },
  };
}

export default async function PermainanKuisSlugPage({ params }: Props) {
  const { slug } = await params;
  const topic = getQuizTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return <QuizSessionView topic={topic} />;
}
