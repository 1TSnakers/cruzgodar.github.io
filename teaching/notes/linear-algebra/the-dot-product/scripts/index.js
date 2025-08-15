import {
    createDesmosGraphs,
    desmosBlue,
    desmosGreen,
    desmosPurple,
    desmosRed,
    getDesmosVector,
    setGetDesmosData
} from "/scripts/src/desmos.js";

export default function()
{
	setGetDesmosData(() =>
	{
		const data =
		{
			vectorSubtraction:
			{
				bounds: { xmin: -4, xmax: 4, ymin: -3, ymax: 5 },

				expressions:
				[
					...getDesmosVector({ from: [0, 0], to: [3, 2], color: desmosPurple }),
					...getDesmosVector({ from: [0, 0], to: [-2, 1], color: desmosBlue }),
					...getDesmosVector({ from: [-2, 1], to: [3, 2], color: desmosRed })
				]
			},

			gramSchmidt:
			{
				bounds: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },

				expressions:
				[
					...getDesmosVector({ from: [0, 0], to: [3, 2], color: desmosPurple }),
					...getDesmosVector({ from: [0, 0], to: [-3, 1], color: desmosBlue }),

					...getDesmosVector({
						from: [0, 0],
						to: ["\\frac{-21}{13}", "\\frac{-14}{13}"],
						color: desmosRed
					}),

					...getDesmosVector({
						from: ["\\frac{-21}{13}", "\\frac{-14}{13}"],
						to: [-3, 1],
						color: desmosGreen
					}),
					...getDesmosVector({
						from: [0, 0],
						to: ["-3 - \\frac{-21}{13}", "1 - \\frac{-14}{13}"],
						color: desmosGreen
					}),
				]
			},
		};

		return data;
	});

	createDesmosGraphs();
}