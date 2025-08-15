import {
    createDesmosGraphs,
    desmosBlue,
    desmosPurple,
    setGetDesmosData
} from "/scripts/src/desmos.js";
import { raw } from "/scripts/src/main.js";

export default function()
{
	setGetDesmosData(() =>
	{
		const data =
		{
			eigenvectors:
			{
				bounds: { xmin: -5, xmax: 15, ymin: -5, ymax: 15 },

				expressions:
				[
					{ latex: raw`v_1 = (1, 2)`, color: desmosPurple },
					{ latex: raw`v_2 = (4, 0)`, color: desmosPurple },

					{ latex: raw`\lambda_1 = 3` },
					{ latex: raw`\lambda_2 = 2` },

					{ latex: raw`\lambda_1\lambda_2` },

					{ latex: raw`(0, 0), v_1, v_1 + v_2`, points: false, lines: true, color: desmosPurple, secret: true },
					{ latex: raw`(0, 0), v_2, v_1 + v_2`, points: false, lines: true, color: desmosPurple, secret: true },

					{ latex: raw`(0, 0), \lambda_1 v_1, \lambda_1 v_1 + \lambda_2 v_2`, points: false, lines: true, color: desmosBlue, secret: true },
					{ latex: raw`(0, 0), \lambda_2 v_2, \lambda_1 v_1 + \lambda_2 v_2`, points: false, lines: true, color: desmosBlue, secret: true },

					{ latex: raw`\frac{v_1}{2}`, label: raw`v₁`, showLabel: true, labelOrientation: "right", color: desmosPurple, hidden: true, secret: true },
					{ latex: raw`\frac{v_2}{2}`, label: raw`v₂`, showLabel: true, labelOrientation: "below", color: desmosPurple, hidden: true, secret: true },

					{ latex: raw`\frac{\lambda_1 v_1}{1.5}`, label: raw` λ₁v₁`, showLabel: true, labelOrientation: "right", color: desmosBlue, hidden: true, secret: true },
					{ latex: raw`\frac{\lambda_2 v_2}{1.5}`, label: raw`λ₂v₂`, showLabel: true, labelOrientation: "below", color: desmosBlue, hidden: true, secret: true },
				]
			},
		};

		return data;
	});

	createDesmosGraphs();
}