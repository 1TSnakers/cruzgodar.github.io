import { currentlyLoadedApplets } from "../applets/applet.js";
import { cardContainer, cardIsOpen } from "./cards.js";
import { recreateDesmosGraphs } from "./desmos.js";
import { darkThemeCheckbox, increaseContrastCheckbox, reduceMotionCheckbox } from "./header.js";
import {
	addStyle,
	pageUrl
} from "./main.js";
import { getDisplayUrl } from "./navigation.js";
import { animate } from "./utils.js";
import anime from "/scripts/anime.js";

export const forceThemePages =
{
	"/gallery": true,
};

const rootElement = document.querySelector(":root");

export const metaThemeColorElement = document.querySelector("#theme-color-meta");


let themeToggles = 0;


const params = new URLSearchParams(window.location.search);

const darkTheme = (() =>
{
	if (params.get("theme") === null)
	{
		return matchMedia("(prefers-color-scheme: dark)").matches;
	}

	return params.get("theme") === "1";
})();

const reduceMotion = (() =>
{
	if (params.get("reducemotion") === null)
	{
		return matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	return params.get("reducemotion") === "1";
})();

const increaseContrast = (() =>
{
	if (params.get("increasecontrast") === null)
	{
		return matchMedia("(prefers-contrast: more)").matches;
	}

	return params.get("increasecontrast") === "1";
})();

export const siteSettings =
{
	darkTheme,
	reduceMotion,
	increaseContrast,
	capsuleHeader: params.get("capsuleheader") === "1",
	scroll: parseInt(params.get("scroll") ?? 0),
	card: params.get("card"),
	resolutionMultiplier: parseFloat(params.get("resmult") ?? "1"),
};



// Set to false, true, or null for when a page has forced a theme and it needs to change back.
let revertThemeTo = null;

export function setRevertThemeTo(newRevertThemeTo)
{
	revertThemeTo = newRevertThemeTo;
}



let forcedTheme = false;

export function setForcedTheme(newForcedTheme)
{
	forcedTheme = newForcedTheme;

	if (darkThemeCheckbox)
	{
		darkThemeCheckbox.setDisabled(true);
	}
}



export function getQueryParams()
{
	const params = new URLSearchParams(window.location.search);



	params.delete("page");

	if (!forcedTheme)
	{
		if (siteSettings.darkTheme && !matchMedia("(prefers-color-scheme: dark)").matches)
		{
			params.set("theme", "1");
		}

		else if (!siteSettings.darkTheme && matchMedia("(prefers-color-scheme: dark)").matches)
		{
			params.set("theme", "0");
		}

		else
		{
			params.delete("theme");
		}
	}



	if (siteSettings.reduceMotion && !matchMedia("(prefers-reduced-motion: reduce)").matches)
	{
		params.set("reducemotion", "1");
	}

	else if (
		!siteSettings.reduceMotion
		&& matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		params.set("reducemotion", "0");
	}

	else
	{
		params.delete("reducemotion");
	}



	if (siteSettings.increaseContrast && !matchMedia("(prefers-contrast: more)").matches)
	{
		params.set("increasecontrast", "1");
	}

	else if (
		!siteSettings.increaseContrast
		&& matchMedia("(prefers-contrast: more)").matches
	) {
		params.set("increasecontrast", "0");
	}

	else
	{
		params.delete("increasecontrast");
	}



	if (siteSettings.capsuleHeader)
	{
		params.set("capsuleheader", "1");
	}

	else
	{
		params.delete("capsuleheader");
	}



	if (siteSettings.scroll)
	{
		params.set("scroll", siteSettings.scroll);
	}

	else
	{
		params.delete("scroll");
	}



	if (siteSettings.card)
	{
		params.set("card", siteSettings.card);
	}

	else
	{
		params.delete("card");
	}

	

	if (siteSettings.resolutionMultiplier && siteSettings.resolutionMultiplier !== 1)
	{
		params.set("resmult", siteSettings.resolutionMultiplier);
	}

	else
	{
		params.delete("resmult");
	}



	if (window.OFFLINE)
	{
		params.set("debug", "2");
	}

	else if (window.DEBUG)
	{
		params.set("debug", "1");
	}

	else
	{
		params.delete("debug");
	}
	
	return params.toString();
}



export function initReduceMotion()
{
	matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) =>
	{
		siteSettings.reduceMotion = e.matches;

		reduceMotionCheckbox && reduceMotionCheckbox.setChecked({
			newChecked: siteSettings.reduceMotion
		});
	});
}

export function initIncreaseContrast()
{
	matchMedia("(prefers-contrast: more)").addEventListener("change", (e) =>
	{
		if (e.matches !== siteSettings.increaseContrast)
		{
			toggleIncreaseContrast({});

			increaseContrastCheckbox &&
				increaseContrastCheckbox.setChecked({
					newChecked: siteSettings.increaseContrast
				});
		}
	});

	if (siteSettings.increaseContrast)
	{
		siteSettings.increaseContrast = false;

		toggleIncreaseContrast({ noAnimation: true });
	}
}

export async function initCapsuleHeader()
{
	if (siteSettings.capsuleHeader)
	{
		siteSettings.capsuleHeader = false;

		toggleCapsuleHeader();
	}
}

export async function initDarkTheme()
{
	matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) =>
	{
		if (cardIsOpen)
		{
			return;
		}

		if ((e.matches && !siteSettings.darkTheme) || (!e.matches && siteSettings.darkTheme))
		{
			toggleDarkTheme({});
		}
	});

	if (forceThemePages[pageUrl] !== undefined)
	{
		if (forceThemePages[pageUrl])
		{
			setForcedTheme(true);
			setRevertThemeTo(siteSettings.darkTheme);
			siteSettings.darkTheme = !forceThemePages[pageUrl];
			await toggleDarkTheme({ noAnimation: true, force: true });
		}

		else if (!forceThemePages[pageUrl])
		{
			revertTheme();
		}

		return;
	}

	if (siteSettings.darkTheme)
	{
		siteSettings.darkTheme = false;

		await toggleDarkTheme({ noAnimation: true });
	}
}



export async function revertTheme()
{
	if (forcedTheme)
	{
		forcedTheme = false;
	}

	if (darkThemeCheckbox)
	{
		darkThemeCheckbox.setDisabled(false);
	}

	if (revertThemeTo === null)
	{
		return;
	}

	if (siteSettings.darkTheme !== revertThemeTo)
	{
		await toggleDarkTheme({ force: true, noAnimation: siteSettings.reduceMotion });
	}
	
	revertThemeTo = null;
}

export let onThemeChange = () => {};
export function setOnThemeChange(callback)
{
	onThemeChange = callback;
}

export async function toggleDarkTheme({
	noAnimation = false,
	force = false,
	duration = 500
}) {
	if (!force && pageUrl in forceThemePages)
	{
		return;
	}

	if (handleEasterEgg())
	{
		return;
	}

	siteSettings.darkTheme = !siteSettings.darkTheme;

	darkThemeCheckbox && darkThemeCheckbox.setChecked({
		newChecked: siteSettings.darkTheme
	});

	recreateDesmosGraphs();

	history.replaceState({ url: pageUrl }, document.title, getDisplayUrl());

	onThemeChange();

	if (noAnimation)
	{
		metaThemeColorElement.setAttribute(
			"content",
			siteSettings.darkTheme ? "#181818" : "#ffffff"
		);

		rootElement.style.setProperty("--theme", siteSettings.darkTheme ? 1 : 0);
	}

	else
	{
		const element = addStyle(`
			*:not(.page, #banner, .desmos-container)
			{
				transition: none !important;
			}
		`);

		const oldTheme = siteSettings.darkTheme ? 0 : 1;
		const newTheme = siteSettings.darkTheme ? 1 : 0;

		await Promise.all([
			anime({
				targets: metaThemeColorElement,
				content: siteSettings.darkTheme ? "#181818" : "#ffffff",
				duration,
				easing: "cubicBezier(.25, .1, .25, 1)",
			}).finished,

			animate((t) =>
			{
				rootElement.style.setProperty("--theme", t * newTheme + (1 - t) * oldTheme);
			}, duration, "cubicBezier(.25, .1, .25, 1)")
		]);

		element.remove();
	}
}



export async function toggleReduceMotion()
{
	siteSettings.reduceMotion = !siteSettings.reduceMotion;

	for (const applet of currentlyLoadedApplets)
	{
		for (const wilson of applet.wilsons)
		{
			wilson.reduceMotion = siteSettings.reduceMotion;
		}
	}

	const helpButton = document.querySelector(".wilson-help-button");
	if (helpButton)
	{
		if (!siteSettings.reduceMotion)
		{
			helpButton.style.setProperty("view-transition-name", `wilson-help-button${Math.random().toString(36).slice(2)}`);
		}
		
		else
		{
			helpButton.style.removeProperty("view-transition-name");
		}
	}

	history.replaceState({ url: pageUrl }, document.title, getDisplayUrl());
}



export async function toggleIncreaseContrast({
	noAnimation = false,
	duration = 150
}) {
	siteSettings.increaseContrast = !siteSettings.increaseContrast;

	history.replaceState({ url: pageUrl }, document.title, getDisplayUrl());

	if (noAnimation)
	{
		rootElement.style.setProperty("--contrast", siteSettings.increaseContrast ? 1 : 0);
	}

	else
	{
		const element = addStyle(`
			*:not(.checkbox)
			{
				transition: none !important;
			}
		`);

		const oldIncreaseContrast = siteSettings.increaseContrast ? 0 : 1;
		const newIncreaseContrast = siteSettings.increaseContrast ? 1 : 0;

		await animate((t) =>
		{
			rootElement.style.setProperty(
				"--contrast",
				t * newIncreaseContrast + (1 - t) * oldIncreaseContrast
			);
		}, duration, "easeInOutSine");

		element.remove();
	}
}



export async function toggleCapsuleHeader()
{
	siteSettings.capsuleHeader = !siteSettings.capsuleHeader;

	history.replaceState({ url: pageUrl }, document.title, getDisplayUrl());

	document.body.classList.toggle("capsule-header", siteSettings.capsuleHeader);
}



let setScrollTimeout = undefined;

export async function setScroll()
{
	if (setScrollTimeout !== undefined)
	{
		clearTimeout(setScrollTimeout);
	}

	setScrollTimeout = setTimeout(() =>
	{
		siteSettings.scroll = cardIsOpen ? cardContainer.scrollTop : window.scrollY;

		history.replaceState({ url: pageUrl }, document.title, getDisplayUrl());
	}, 100);
}



let timeoutId;

let shownEasterEgg = false;

function handleEasterEgg()
{
	themeToggles++;

	clearTimeout(timeoutId);

	timeoutId = setTimeout(() => themeToggles = 0, 300);
	
	if (themeToggles >= 8 && !shownEasterEgg)
	{
		shownEasterEgg = true;

		clearTimeout(timeoutId);

		document.body.querySelector("#header-settings-button").innerHTML = "boo";

		addStyle(`
			#banner, img, canvas
			{
				filter: brightness(max(calc(var(--extra-brightness) / 10), 1)) saturate(var(--extra-brightness)) contrast(var(--extra-brightness)) hue-rotate(calc(var(--extra-brightness) * 5deg));
			}
		`, false);

		const startingBackground = siteSettings.darkTheme
			? "lch(8.25% 0 0)"
			: "lch(100% 0 0)";

		const startingHighContrast = siteSettings.darkTheme
			? "lch(100% 23.2 0)"
			: "lch(0% 0 0)";

		const startingNormalContrast = siteSettings.darkTheme
			? "lch(83.48% 0 0)"
			: "lch(27.09% 0 0)";

		const startingLowContrast = siteSettings.darkTheme
			? "lch(74.78% 0 0)"
			: "lch(40.73% 0 0)";

		document.documentElement.style.filter = "brightness(1)";

		animate((t) =>
		{
			rootElement.style.setProperty(
				"--background",
				`color-mix(in lch, ${startingBackground} ${(1 - t) * 100}%, lch(46.62% 108.32 40.84))`
			);

			rootElement.style.setProperty(
				"--high-contrast",
				`color-mix(in lch, ${startingHighContrast} ${(1 - t) * 100}%, lch(79.24% 134.33 134.57))`
			);

			rootElement.style.setProperty(
				"--normal-contrast",
				`color-mix(in lch, ${startingNormalContrast} ${(1 - t) * 100}%, lch(79.24% 134.33 134.57))`
			);

			rootElement.style.setProperty(
				"--low-contrast",
				`color-mix(in lch, ${startingLowContrast} ${(1 - t) * 100}%, lch(79.24% 134.33 134.57))`
			);

			rootElement.style.setProperty(
				"--extra-brightness",
				t * 10 + 1
			);
		}, 2000);
	}

	return shownEasterEgg;
}