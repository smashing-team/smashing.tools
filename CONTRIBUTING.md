# Contributing to smashing.tools

## Introduction

Welcome to Smashing.tools! For an overview and technical insights of our project, please refer to the README file accessible from the GitHub page. We eagerly await your contributions and wish you great success.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node [v18.0.0](https://nodejs.org/en/download/)
- Pnpm [v8.12.0](https://pnpm.io/installation)
- [Git](https://git-scm.com/downloads)


### Installation

To set up the project for development:
1. Fork the repository on GitHub.
2. Clone your fork to your local machine: `git clone [URL of your fork]`.
3. Navigate to the cloned directory: `cd [repository name]`.
4. Install the required packages using Pnpm: pnpm install
5. Pagefind requires a search index to be built before it can be used. To build the index, run the following command: `pnpm run build`.

## Usage

After installation, to run the project locally:
1. Start the project: `pnpm dev`.
2. Open your browser and navigate to `http://localhost:3000`.

## **Folder Structure**

```
smashing.tools/
  ├── src/
    │   ├── components/ # Mix of React and Astro components for UI versatility.
    │   ├── content/ # Static content in Markdown for Astro-powered site.
    │   ├── layouts/ # Layout templates defining UI structure.
    │   ├── pages/ # Astro hybrid pages with static and dynamic content.
    │   ├── plugins/ # Astro plugins for added functionality.
    │   ├── styles/ # TailwindCSS styling for visual theme and design.
    │   ├── types/ # TypeScript definitions for type safety and consistency.
    │   ├── utils/ # Utility functions and helpers for common functionality.
```

## Contributing

### How to Contribute

1. **Find something to work on**: Check the 'Issues' tab in the GitHub repository for open issues that interest you.
2. **Create a branch**: Once you've picked an issue, create a new branch in your fork to work on your changes: `git checkout -b [your-branch-name]`.
3. **Make your changes**: Write code, fix bugs, or update documentation as necessary.
4. **Follow coding standards**: Ensure your code adheres to the project's coding standards.
7. **Commit your changes**: Make small, incremental commits that are descriptive about what you have changed: `git commit -m "A brief description of the change"`.
8. **Push to your fork**: Once you're ready, push your changes to your fork: `git push origin [your-branch-name]`.

### Pull Request Process

1. **Submit a pull request (PR)**: Go to the repository on GitHub and click 'New pull request'. Select your branch and provide a clear, detailed description of your changes and why they're needed.
2. **Review process**: The project maintainers will review your PR. Be open to feedback and make requested changes if needed.
3. **Merging**: Once your PR is approved, a maintainer will merge it into the main codebase.

### Code of Conduct

We are committed to fostering a welcoming and respectful community. Please refer to our [Code of Conduct](https://github.com/smashing-team/smashing.tools/blob/main/CODE_OF_CONDUCT.md) for guidelines on expected behavior.