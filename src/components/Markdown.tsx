import ReactMarkdown from "react-markdown";

import { Typography } from "./ui/typography";

interface Props {
  content: string;
  className?: string;
}
export function Markdown({ content, className }: Props) {
  return (
    <ReactMarkdown
      className={className}
      components={{
        h1: (e) => (
          <Typography variant="h1" component="h1">
            {e.children}
          </Typography>
        ),
        h2: (e) => (
          <Typography variant="h2" component="h2">
            {e.children}
          </Typography>
        ),
        h3: (e) => (
          <Typography variant="h3" component="h3">
            {e.children}
          </Typography>
        ),
        h4: (e) => (
          <Typography variant="h4" component="h4">
            {e.children}
          </Typography>
        ),
        h5: (e) => (
          <Typography variant="h5" component="h5">
            {e.children}
          </Typography>
        ),
        p: (e) => <Typography variant="p">{e.children}</Typography>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
