console.log("Email Writer Extension - Content Script Loaded");

function createAIButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}
function findEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.ail",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
    return "";
  }
}
function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
    return null;
  }
}
function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) existingButton.remove();

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }
  console.log("Toolbar found, creating a button");
  const button = createAIButton();
  button.classList.add("ai-reply-button");

  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;

      const emailContent = findEmailContent();
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error("API Request Failed");
      }
      const generateReply = await response.text();
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );
      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generateReply);
      } else {
        console.error("ComposeBox was not found.");
      }
    } catch (error) {
      console.log(error);
      alert("Fail to Generate Reply");
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNotes = Array.from(mutation.addedNodes);
    const hasComposedElements = addedNotes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]'))
    );
    if (hasComposedElements) {
      console.log("Compose Window Detected.");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
