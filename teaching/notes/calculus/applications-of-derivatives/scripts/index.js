import {
    createDesmosGraphs,
    desmosBlue,
    desmosPurple,
    desmosRed,
    setGetDesmosData
} from "/scripts/src/desmos.js";
import { raw } from "/scripts/src/main.js";

export default function()
{
	setGetDesmosData(() =>
	{
		const data =
		{
			derivativeInterpretation:
			{
				bounds: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },

				expressions:
				[
					{ latex: raw`g(t) = \frac{1}{8} t^3 - \frac{1}{2} t`, color: desmosPurple },
					{ latex: raw`l(x) = g(a) + g'(a)(x - a)`, color: desmosBlue, secret: true },
					{ latex: raw`a = 0`, sliderBounds: { min: -5, max: 5 } },
					{ latex: raw`(a, g(a))`, secret: true, color: desmosBlue },
					{ latex: raw`(a + 1, g(a + 1)), (a + 1, l(a + 1))`, color: desmosRed, secret: true, lines: true, lineStyle: "DOTTED" },
				]
			},
		};

		return data;
	});

	createDesmosGraphs();
}