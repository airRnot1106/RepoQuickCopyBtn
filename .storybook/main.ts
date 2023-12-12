import path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import { loadConfigFromFile, mergeConfig } from 'vite';
import tscofigPaths from 'vite-tsconfig-paths';

const configEnvServe = {
  mode: 'development',
  command: 'serve',
  ssrBuild: false,
} as const;
const configEnvBuild = {
  mode: 'production',
  command: 'build',
  ssrBuild: false,
} as const;

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config, { configType }) => {
    const isProduction = configType === 'PRODUCTION';
    const { config: userConfig } = (await loadConfigFromFile(
      isProduction ? configEnvBuild : configEnvServe,
      path.resolve(__dirname, '../vitest.config.ts'),
    )) ?? { config: {} };

    return mergeConfig(config, {
      ...userConfig,
      plugins: [tscofigPaths()],
      build: {
        ...config.build,
        sourcemap: isProduction,
      },
    });
  },
};
export default config;
