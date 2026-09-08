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
      canonical: `https://sigmaplatform.vercel.app/kuis/${topic.slug}`,
    },
    openGraph: {
      title: `Kuis: ${topic.title} | SIGMA`,
      description: topic.description,
      url: `https://sigmaplatform.vercel.app/kuis/${topic.slug}`,
      type: "website",
      images: [
        {
          url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
    },
  };
}

export default async function QuizCategoryPage({ params }: Props) {
  const { slug } = await params;
  const topic = getQuizTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return <QuizSessionView topic={topic} />;
}
