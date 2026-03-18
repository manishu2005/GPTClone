
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const Message = ({ role, content, copyCode }) => {
  return (
    <div className={role === "user" ? "userDiv" : "gptDiv"}>
      <div className={role === "user" ? "userMessage" : "gptMessage"}>
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ inline, className, children, ...props }) {
              const code = Array.isArray(children)
  ? children.map((c) => (typeof c === "string" ? c : c.props?.children || "")).join("")
  : children;
              const language = className?.replace("language-", "") || "";

              if (!inline) {
                return (
                  <div className="codeBlock">
                    <div className="codeHeader">
                      <span className="codeLang">{language}</span>

                      <button
                        className="copyBtn"
                        onClick={() => copyCode(code)}
                      >
                        Copy
                      </button>
                    </div>

                    <pre>
                      <code className={className} {...props}>
                        {code}
                      </code>
                    </pre>
                  </div>
                );
              }

              return (
                <code className="inlineCode" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;

