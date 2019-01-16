"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = require("request-promise");
const req = require('tiny_request');
class BotsLongPollUpdatesProvider {
    constructor(api, groupId) {
        this.api = api;
        this.groupId = groupId;
        this.init();
    }
    getUpdates(callback) {
        this.updatesCallback = callback;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                yield this.getServerData();
                yield this.poll();
            }
        });
    }
    getServerData() {
        return __awaiter(this, void 0, void 0, function* () {
            let longPollServer = yield this.api.groupsGetLongPollServer({
                group_id: this.groupId
            });
            this.server = longPollServer.server;
            this.key = longPollServer.key;
            this.ts = longPollServer.ts;
        });
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                try {
                    const body = yield request_promise_1.get({
                        url: `${this.server}?act=a_check&key=${this.key}&ts=${this.ts}&wait=25`,
                        json: true
                    });
                    if (body.failed) {
                        break;
                    }
                    this.ts = body.ts;
                    if (this.updatesCallback)
                        this.updatesCallback(body.updates);
                }
                catch (e) {
                    console.log(e);
                    break;
                }
            }
        });
    }
}
exports.BotsLongPollUpdatesProvider = BotsLongPollUpdatesProvider;
//# sourceMappingURL=BotsLongPollUpdatesProvider.js.map