import { loadScript, pageUrl, raw } from "./main.js";

 
const preamble = raw`\documentclass{article}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{amsmath}
\usepackage{amsfonts}
\usepackage{amssymb}
\usepackage[dvipsnames]{xcolor}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage{graphicx}
\usepackage[total={6.5in, 9in}, heightrounded]{geometry}
\usepackage{hyperref}

\graphicspath{{graphics/}}
\setenumerate[0]{label=\alph*)}
\setlength{\parindent}{0pt}
\setlength{\parskip}{8pt}
\setlength\fboxsep{0pt}
\renewcommand{\baselinestretch}{1.6}
\titleformat{\section}
{\normalfont \Large \bfseries \centering}{}{0pt}{}

\begin{document}

\Large Name: [YOUR NAME HERE] \hfill `;

export function convertCardToLatex(element, title, course)
{
	const clonedElement = element.cloneNode(true);

	clonedElement.querySelectorAll(".tex-holder > *, #card-close-button, h1")
		.forEach(e => e.remove());
	
	const firstSection = clonedElement.querySelector("h2")
		?? clonedElement.querySelector(".text-buttons").nextElementSibling;
	
	while (firstSection.previousElementSibling)
	{
		firstSection.previousElementSibling.remove();
	}

	const imageUrls = [];

	const tex = preamble
		+ `${title} | ${course} | Cruz Godar \\vspace{4pt} \\normalsize\n\n`
		+ clonedElement.innerHTML
			.replaceAll(/<img.*? src="(.+?)".*?>(<\/img>)?/g, (match, $1) =>
			{
				imageUrls.push($1);
				const filename = $1.split("/").pop();
				return `
\\begin{center}
	\\includegraphics[width=0.5\\linewidth]{${filename}}
\\end{center}
`;
			})
			.replaceAll(/<a.*? href="(.+?)".*?>(.+?)<\/a>/g,  (match, $1, $2) =>
			{
				console.log($1, $2);
				if ($1.slice(0, 4) === "http" || $1.slice(0, 3) === "www")
				{
					return `\\href{${$1}}{${$2}}`;
				}

				else if ($1[0] === "/")
				{
					return `\\href{https://cruzgodar.com${$1}}{${$2}}`;
				}

				return `\\href{https://cruzgodar.com${pageUrl}/${$1}}{${$2}}`;
			})
			.replaceAll(/<!--.*?-->/g, "")
			.replaceAll(/<p.*?>(.+?)<\/p>/g, (match, $1) => `${$1}\n\n`)
			.replaceAll(
				/<span[^>]*?inline-math[^>]*?data-source-tex="(.*?)"[^>]*?>(.*?)<\/span>/g,
				(match, $1, $2) => `$${$1}$${$2}`
			)
			.replaceAll(
				/<span[^>]*?tex-holder[^>]*?data-source-tex="(.*?)"[^>]*?>(.*?)<\/span>/g,
				(match, $1, $2) => `${$1}${$2}`
			)
			.replaceAll(/\[NEWLINE\]/g, "\n")
			.replaceAll(/\[TAB\]/g, "\t")
			.replaceAll(/<strong.*?>(.+?)<\/strong>/g, (match, $1) => `\\textbf{${$1}}`)
			.replaceAll(/<em.*?>(.+?)<\/em>/g, (match, $1) => `\\textit{${$1}}`)
			.replaceAll(/<span.*?><\/span>[a-z]\)/g, "\t\\item")
			.replaceAll(
				/((?:\t\\item.*\n\n)+)/g,
				(match, $1) => `\\begin{enumerate}\n\n${$1}\\end{enumerate}\n\n`
			)
			.replaceAll(/\n\n/g, "\n")
			.replaceAll(/(\n[0-9]+\.)/g, (match, $1) => `\n${$1}`)
			.replaceAll(/<span style="height: 32px"><\/span>/g, "\n~\\\\")
			.replaceAll(/<h2.*?>(.+?)<\/h2>/g, (match, $1) => `\n\\section{${$1}}\n\n`)
			.replaceAll(/&amp;/g, " &")
			.replaceAll(/&lt;/g, "<")
			.replaceAll(/\s\s&/g, " &")
			.replaceAll(/–/g, "--")
			.replaceAll(/—/g, "---")
		+ "\n\\end{document}";

	if (imageUrls.length)
	{
		downloadTexWithGraphics(title, tex, imageUrls);
	}

	else
	{
		downloadTex(title, tex);
	}
}

async function downloadTexWithGraphics(filename, text, imageUrls)
{
	await Promise.all([
		loadScript("/scripts/jszip.min.js"),
		loadScript("/scripts/fileSaver.min.js")
	]);

	// eslint-disable-next-line no-undef
	const zip = new JSZip();

	zip.file(`${filename}.tex`, text);

	const graphics = zip.folder("graphics");

	for (const imageUrl of imageUrls)
	{
		// Generate base64 data for the image.
		const image = await fetch(imageUrl).then(res => res.blob());
		graphics.file(imageUrl.split("/").pop(), image);
	}

	const blob = await zip.generateAsync({ type: "blob" });
	// eslint-disable-next-line no-undef
	saveAs(blob, `${filename}.zip`);
}

function downloadTex(filename, text)
{
	const element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/x-tex;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", `${filename}.tex`);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}