interface HighlightTextProps {
  text: string
  keyword?: string
}

export function HighlightText({ text, keyword }: HighlightTextProps) {
  if (!keyword) return <>{text}</>

  const parts = text.split(new RegExp(`(${keyword})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={i} className="text-primary">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}
