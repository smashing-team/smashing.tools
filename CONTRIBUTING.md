# Contributing to Smashing.tools

## Introduction

Welcome to Smashing.tools! For an overview and technical details of our project, please visit our [README file on GitHub](https://github.com/smashing-team/smashing.tools/blob/contributing/README.md). We eagerly await your contributions and are excited about your participation.

## Getting Started

### Prerequisites

Before you begin, ensure you have installed:
- [Node v18.0.0](https://nodejs.org/en/download/)
- [Pnpm v8.12.0](https://pnpm.io/installation)
- [Git](https://git-scm.com/downloads)

### Installation

To set up the development environment, follow these steps:
1. Fork the GitHub repository.
2. Clone your fork to your local machine: `git clone [your fork's URL]`.
3. Navigate to the cloned directory: `cd [repository name]`.
4. Install the required packages using Pnpm: `pnpm install`.
5. Build the search index for Pagefind by running: `pnpm run build`.

## Usage

To run the project locally:
1. Start the project with `pnpm dev`.
2. Open your browser and navigate to `http://localhost:3000`.

## Contributing

### Conventional Commits

Our project embraces Conventional Commits standards to enhance the clarity and maintainability of our codebase. It's important that your commit messages adhere to these standards. For more information and examples of Conventional Commits, please refer to this [link](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).

### How to Contribute

1. **Find a Task**: Look for open issues in the 'Issues' tab on GitHub.
2. **Create a Branch**: In your fork, create a branch for your changes: `git checkout -b [your-branch-name]`.
3. **Make Changes**: Code, debug, or update documentation as needed.
4. **Adhere to Standards**: Ensure your work follows the project's coding guidelines.
5. **Commit Your Changes**: Commit your changes in a descriptive manner, following the Conventional Commits format: `git commit -m "[commit type]: [short description]"`.
6. **Push Your Changes**: Push your changes to your fork: `git push origin [your-branch-name]`.

### Pull Request Process

1. **Submit a PR**: On GitHub, click 'New pull request'. Choose your branch and provide a detailed description of your changes.
2. **Review Process**: Be open to feedback and make necessary adjustments.
3. **Merging**: Once approved, a maintainer will merge your PR into the main codebase.

### Code of Conduct

Our community is committed to fostering a respectful and inclusive environment. Please adhere to our [Code of Conduct](https://github.com/smashing-team/smashing.tools/blob/main/CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License. See the [LICENSE file](https://github.com/smashing-team/smashing.tools/blob/contributing/LICENSE) for details.
