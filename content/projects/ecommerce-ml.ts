const content = `# E-Commerce Review Quality Prediction

### A machine-learning pipeline for identifying low-quality customer reviews.

## Problem

Review quality cannot be inferred from text alone. The project combines behavioral, temporal, and text-derived signals to distinguish low-quality submissions.

## Approach

I built the pipeline from cleaning and exploratory analysis through feature engineering, training, and held-out evaluation. Logistic Regression provided a baseline, followed by Random Forest and XGBoost comparisons.

The final evaluation reached a **0.831 ROC-AUC** on the held-out test set.

## Engineering decisions

- Keep training and test transformations consistent through a single feature pipeline.
- Compare a readable linear baseline with tree-based ensemble models.
- Use ROC-AUC to evaluate ranking quality across classification thresholds.
- Inspect behavioral and temporal variables alongside derived text features.

## Stack

Python, pandas, NumPy, scikit-learn, XGBoost, and Matplotlib.

## Repository

[View the review-quality project](https://github.com/minhpham1810/csci349_2025fa_final_project)
`;

export default content;
