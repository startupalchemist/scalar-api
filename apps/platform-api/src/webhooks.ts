import crypto from "crypto";
import type { RatingsRepository } from "@platform/engine";

export function createWebhookDispatcher(repository: RatingsRepository) {
  return async function fireWebhooks(event: string, payload: Record<string, unknown>): Promise<void> {
    const hooks = await repository.getActiveWebhooksForEvent(event);

    for (const hook of hooks) {
      const body = JSON.stringify({
        event,
        data: payload,
        timestamp: new Date().toISOString(),
      });
      const signature = crypto.createHmac("sha256", hook.secret).update(body).digest("hex");
      const startedAt = Date.now();

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(hook.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Signature": signature,
            "X-Webhook-Event": event,
          },
          body,
          signal: controller.signal,
        });
        clearTimeout(timeout);

        const responseText = await response.text().catch(() => "");
        await repository.createWebhookLog({
          webhookId: hook.id,
          event,
          payload: body,
          statusCode: response.status,
          response: responseText.substring(0, 2000),
          success: response.ok,
          duration: Date.now() - startedAt,
        });
      } catch (error) {
        await repository.createWebhookLog({
          webhookId: hook.id,
          event,
          payload: body,
          statusCode: 0,
          response: error instanceof Error ? error.message : "Connection failed",
          success: false,
          duration: Date.now() - startedAt,
        });
      }
    }
  };
}
