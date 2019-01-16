import {BaseUpdateProvider} from "./BaseUpdateProvider";
import {VKApi} from "../VKApi";
import {get} from "request-promise";
const req = require('tiny_request')

export class BotsLongPollUpdatesProvider implements BaseUpdateProvider {
    private server: string;
    private key: string;
    private ts: number;
    private updatesCallback: (update: any) => void;

    constructor(
        private api: VKApi,
        private groupId: number
    ) {
        this.init()
    }

    public getUpdates(callback: (update: any) => void) {
        this.updatesCallback = callback
    }

    private async init() {
        while (true) {
            await this.getServerData();
            await this.poll();
        }
    }

    private async getServerData() {
        let longPollServer = await this.api.groupsGetLongPollServer({
            group_id: this.groupId
        });

        this.server = longPollServer.server;
        this.key = longPollServer.key;
        this.ts = longPollServer.ts;
    }

    private async poll() {
        while (true) {
            try {
                const body = await get({
                    url: `${this.server}?act=a_check&key=${this.key}&ts=${this.ts}&wait=25`,
                    json: true
                });

                if (body.failed) {
                    break;
                }

                this.ts = body.ts;

                if (this.updatesCallback)
                    this.updatesCallback(body.updates)

            } catch (e) {
                console.log(e);
                break;
            }
        }
    }
}