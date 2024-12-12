"use client";

import MarkDownViewer from "@/components/main/book/note/MarkDownViewer";

export default function DetailClientComponent({
  content,
}: {
  content: string;
}) {
  return (
      <MarkDownViewer content={content} />
  );
}
