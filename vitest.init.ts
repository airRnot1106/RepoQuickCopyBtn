import '@testing-library/jest-dom';
import * as chrome from 'vitest-chrome/lib/index.esm';

Object.assign(global, chrome);

import { setProjectAnnotations } from '@storybook/react';
import * as globalStorybookConfig from './.storybook/preview';

setProjectAnnotations(globalStorybookConfig.default);
