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
      className="mb-4 last-of-type:mb-0"
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
    <Container className="mb-8">
      <article>
        <Typography variant="h4" component="h2" className="mb-4">
          Descripción
        </Typography>
        {document.content.map((content) => topLevelMapper(content))}
      </article>
    </Container>
  );
}
