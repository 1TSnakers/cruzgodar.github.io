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
				bounds: { left: -1, right: 3, bottom: -1, top: 3 },

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
				bounds: { left: -20, right: 20, bottom: -2, top: 2 },

				expressions:
				[
					{ latex: raw`f(x) = \frac{\sin(x)}{x}`, color: desmosBlue },
					{ latex: raw`(0, 1)`, color: desmosBlue, pointStyle: "OPEN" },
					{ latex: raw`(0, -1)`, color: desmosBlue }
				]
			},



			continuityExample:
			{
				bounds: { left: -2, right: 7, bottom: -2, top: 3 },

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
				bounds: { left: -2.333, right: 3.667, bottom: -1.667, top: 4.333 },

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
				bounds: { left: -2.333, right: 3.667, bottom: -1.667, top: 4.333 },

				expressions:
				[
					{ latex: raw`f(x) = x^3 - 2x^2 + 2`, color: desmosPurple, secret: true, hidden: true },
					{ latex: raw`f(x)`, color: desmosPurple },

					{ latex: raw`f'(x)`, color: desmosBlue },
					{ latex: raw`(0, f(0)), (\frac{4}{3}, f(\frac{4}{3}))`, color: desmosBlue, secret: true },

					{ latex: raw`f''(x)`, color: desmosRed },
					{ latex: raw`(\frac{2}{3}, f(\frac{2}{3}))`, color: desmosRed, secret: true },
				]
			}
		};

		return data;
	});

	createDesmosGraphs();
}