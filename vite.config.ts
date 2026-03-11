import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment';
import react from '@vitejs/plugin-react'

const clientEnvVars = ['BOX_RESIZE_BUFFER']

export default defineConfig({
  plugins: [react(), EnvironmentPlugin(clientEnvVars)],
})
