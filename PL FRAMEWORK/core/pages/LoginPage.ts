import { Page, Locator, expect } from '@playwright/test';
import config from '@config/config.json';
import * as dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
  private page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async loginWithPersona(persona: string): Promise<void> {
    const client = process.env.CLIENT;
    const env = process.env.ENV;
    
    if (!client || !env) {
      throw new Error(`CLIENT and ENV environment variables must be set. Current values: CLIENT=${client}, ENV=${env}`);
    }
        const envConfig = (config as any)[client]?.[env];

    if (!envConfig) {
      throw new Error(`No config found for client=${client}, env=${env}`);
    }
    
    let username = '';
    let password = '';
    const url = envConfig.URL;
    
    switch (persona.toLowerCase()) {
      case 'categorymanager':
        username = envConfig.ITEMMDMMANAGERUSER;
        password = envConfig.PASSWORD;
        break;
      case 'caterpillaradmin':
        username = envConfig.ITEMMDMUSER;
        password = envConfig.PASSWORD;
        break;
      case 'stduser':
        username = envConfig.STDUSER;
        password = envConfig.PASSWORD;
        break;
      default:
        throw new Error(`Unknown persona: ${persona}`);
    }

    console.log(`Client: ${client}, Env: ${env}, User: ${username}, URL: ${url}`);
    await this.page.goto(url);
    await this.username.fill(username);
    await this.password.fill(password);
    await this.page.click('[data-test="login-button"]');
  }

  async decrypt(text: string): Promise<string> {
  return Buffer.from(text, "base64").toString("utf-8");
  }

}
