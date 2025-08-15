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
			testGraph:
			{
				use3d: true,

				bounds: { xmin: -1, xmax: 3, ymin: -1, ymax: 3, zmin: -1, zmax: 3 },

				expressions:
				[
					{ latex: raw`f(x) = x^3 - 2x^2 + 2`, color: desmosPurple },
					{ latex: raw`a = 0` },
					{ latex: raw`b = 2` },

					{ latex: raw`x = [a, b] \{0 \leq y \leq f(x)\} `, color: desmosPurple, secret: true },
					{ latex: raw`0 \leq y \leq f(x) \{a \leq x \leq b\}`, color: desmosPurple, secret: true }
				]
			},



			limitExample:
			{
				bounds: { xmin: -20, xmax: 20, ymin: -2, ymax: 2 },

				expressions:
				[
					{ latex: raw`f(x) = \frac{\sin(x)}{x}`, color: desmosBlue },
					{ latex: raw`(0, 1)`, color: desmosBlue, pointStyle: "OPEN" },
					{ latex: raw`(0, -1)`, color: desmosBlue }
				]
			},



			continuityExample:
			{
				bounds: { xmin: -2, xmax: 7, ymin: -2, ymax: 3 },

				expressions:
				[
					{ latex: raw`f(x) = \left\{0 \leq x \leq 1: 2x, 1 < x < 3: \frac{1}{x} + 1, 3 \leq x: -\frac{2}{3} + \frac{2}{3}x\right\}`, color: desmosPurple },
					{ latex: raw`(0, 0)`, color: desmosPurple, secret: true },

					{ latex: raw`g(x) = \left\{ 0 \leq x < 1: x - 1, 1 < x < 3: -\frac{1}{x}, 3 \leq x: -\frac{2}{3} \right\}`, color: desmosBlue },
					{ latex: raw`(0, -1), (3, -\frac{2}{3})`, color: desmosBlue, secret: true },
					{ latex: raw`(1, 0), (1, -1), (3, -\frac{1}{3})`, color: desmosBlue, pointStyle: "OPEN", secret: true }
				]
			},



			derivativeExample:
			{
				bounds: { xmin: -2.333, xmax: 3.667, ymin: -1.667, ymax: 4.333 },

				expressions:
				[
					{ latex: raw`f(x) = x^3 - 2x^2 + 2`, color: desmosPurple },
					{ latex: raw`a = .667`, secret: true },
					{ latex: raw`(a, f(a))`, color: desmosBlue, secret: true },
					{ latex: raw`y - f(a) = f'(a)(x - a)`, color: desmosBlue, secret: true },
					{ latex: raw`f'(x)`, color: desmosRed, secret: true },
					{ latex: raw`(a, f'(a))`, color: desmosRed, dragMode: "NONE", showLabel: true, secret: true },
				]
			},



			secondDerivativeTest:
			{
				bounds: { xmin: -2.333, xmax: 3.667, ymin: -1.667, ymax: 4.333 },

				expressions:
				[
					{ latex: raw`f(x) = x^3 - 2x^2 + 2`, color: desmosPurple, secret: true, hidden: true },
					{ latex: raw`f(x)`, color: desmosPurple },

					{ latex: raw`f'(x)`, color: desmosBlue },
					{ latex: raw`(0, f(0)), (\frac{4}{3}, f(\frac{4}{3}))`, color: desmosBlue, secret: true },

					{ latex: raw`f''(x)`, color: desmosRed },
					{ latex: raw`(\frac{2}{3}, f(\frac{2}{3}))`, color: desmosRed, secret: true },
				]
			},



			secondDerivativeTest2:
			{
				bounds: { xmin: -2, xmax: 3, ymin: -5, ymax: 3 },

				expressions:
				[
					{ latex: raw`g(x) = x^3 - 2x^2 + x \left\{ -1 \leq x \leq 2\right\}`, color: desmosPurple, secret: true, hidden: true },
					{ latex: raw`g(x)`, color: desmosPurple },
					{ latex: raw`g'(x)`, color: desmosBlue, hidden: true },
					{ latex: raw`g''(x)`, color: desmosRed, hidden: true },
				]
			}
		};

		return data;
	});

	createDesmosGraphs();
}