import ReactMarkdown from 'react-markdown';

const markdownContent = `
  # Titre principal

  Ceci est un paragraphe en **Markdown**!

  ## Sous-titre

  - Une liste
  - Avec quelques éléments
  - Un autre élément

  ### Un peu de code

  \`\`\`javascript
  const example = "Ceci est un exemple de code";
  console.log(example);
  \`\`\`

  Et voilà, c'est tout!
`;

const Markdown = () => {
  return (
    <div>
      <h1>Rendu Markdown</h1>
      <ReactMarkdown components={{ul: "list-disc"}}>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default Markdown;