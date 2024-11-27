import { Document, TopLevelBlock, Text, Block, Inline } from "@contentful/rich-text-types";

import { Container } from "@/components/container";
import { Typography } from "@/components/ui/typography";

type TextMapper = (Block | Inline | Text) & { value?: string };
function textMapper(content: TextMapper[]) {
  const block = content[0];
  return (
    <Typography
      variant="p"
      component="p"
      key={JSON.stringify(block)}
      className="mb-4 text-balance text-sm leading-normal last-of-type:mb-0"
    >
      {block.value}
    </Typography>
  );
}

function topLevelMapper(topLevelBlock: TopLevelBlock) {
  if (topLevelBlock.nodeType === "paragraph") {
    const content = topLevelBlock.content;
    return textMapper(content);
  }
  return <></>;
}

interface Props {
  document: Document;
}
export function BlockDescription({ document }: Props) {
  return (
    <>
      <div className="mb-2 text-sm font-semibold uppercase tracking-tight text-[#007276]">
        Descripción:
      </div>
      <article className="mb-8">
        {document.content.map((content) => topLevelMapper(content))}
      </article>
    </>
  );
}
