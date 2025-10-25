# Logistic Regression Practice Quiz (Vanilla JS)

A lightweight, scrollable practice quiz to help students review logistic regression concepts. Built with plain HTML/CSS/JS (no frameworks). Includes a per-question "Reveal answer" button and an optional sigmoid visual using Chart.js.

## Features
- One-page, light theme with card-style questions
- 12 core questions covering sigmoid, log-odds, thresholding, loss, gradients, regularization, metrics, and multiclass
- Per-question "Reveal answer" toggles (no submissions required)
- Sigmoid explorer: interactive slider and chart to visualize p = σ(z)
 - Questions are shuffled on each page load

## Files
- `index.html` – Main page with the quiz content
- `styles.css` – Light theme styling
- `script.js` – Reveal button logic and the sigmoid explorer

## Run locally
You can simply open `index.html` in your browser. For a slightly more realistic setup (avoids any file:// quirks), start a tiny static server:

```bash
python3 -m http.server 8000
```

Then visit:

```
http://localhost:8000/
```

## Notes
- Chart.js is loaded via CDN. If you need offline use, download and serve it locally or remove the chart block.
- No build step required.

## License
Educational use. Adjust, extend, or adapt questions for your class as needed.