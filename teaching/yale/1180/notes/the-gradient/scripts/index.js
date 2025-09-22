import {
	createDesmosGraphs,
	desmosBlue3d,
	desmosPurple3d,
	desmosRed3d,
	getDesmosSlider,
	setGetDesmosData
} from "/scripts/src/desmos.js";
import { raw } from "/scripts/src/main.js";

export default function()
{
	setGetDesmosData(() =>
	{
		const data =
		{
			directionalDerivative:
			{
				use3d: true,

				bounds: { xmin: -1, xmax: 1, ymin: -1, ymax: 1, zmin: -1, zmax: 1 },

				options: { showPlane3D: false },

				expressions:
				[
					{ latex: raw`f(x, y) = \frac{1}{4}(x^2 - y^3 - x^3y)`, color: desmosPurple3d, hidden: false },

					{ latex: raw`f_x(x, y) = \frac{d}{dx}(f(x, y))`, color: desmosPurple3d, hidden: true, secret: true },
					{ latex: raw`f_y(x, y) = \frac{d}{dy}(f(x, y))`, color: desmosPurple3d, hidden: true, secret: true },

					...getDesmosSlider({
						expression: "a = -0.4",
						min: -5,
						max: 5,
						secret: false,
					}),
					...getDesmosSlider({
						expression: "b = 0.6",
						min: -5,
						max: 5,
						secret: false,
					}),

					...getDesmosSlider({
						expression: "s = 1",
						min: 0,
						max: "2\\pi",
						secret: false,
					}),

					{ latex: raw`(a, b, f(a, b))`, color: desmosRed3d },

					// eslint-disable-next-line max-len
					// { latex: raw`(a + \cos(s)t, b + \sin(s)t, f(a + \cos(s)t, b + \sin(s)t))`, parametricDomain: { min: -2, max: 2 }, color: desmosPurple3d, secret: true },

					{ latex: raw`(a, b, f(a, b)) + t(\cos(s), \sin(s), \cos(s)f_x(a, b) + \sin(s)f_y(a, b))`, parametricDomain: { min: -2, max: 2 }, color: desmosRed3d },

					{ latex: raw`z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)`, color: desmosBlue3d },
				]
			},
		};

		return data;
	});

	createDesmosGraphs();
}