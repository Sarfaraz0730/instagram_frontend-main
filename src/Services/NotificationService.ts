import { randomId } from "ap-components";
import { singleton } from "tsyringe";

@singleton()
export default class NotificationService {
    constructor() {
    }

    static notifMap: any = {};

    sendMessage(title: string, body: string, onClick?: () => any) {
        Notification.requestPermission(function (permission) {
            var id = randomId();

            if (onClick) {
                NotificationService.notifMap[id] = onClick;
            }

            var notification = new Notification(title, {
                body: body,
                icon: 'assets/favicon.ico',
                dir: 'auto',
                data: { id },
            });

            notification.onclick = function (event: any) {
                var data = event.currentTarget.data;
                var { id } = data;
                var callback = NotificationService.notifMap[id];
                if (callback) {
                    notification.close();
                    callback();
                }
            }

            setTimeout(function () {
                notification.close();
            }, 5000);
        });
    };
}