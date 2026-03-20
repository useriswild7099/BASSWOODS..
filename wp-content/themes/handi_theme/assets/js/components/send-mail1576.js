export default class SendMail {
    constructor(){
        this.mailScriptUrl = php_vars.mail_script;
    }

    async send (formData) {
        const response = await fetch(this.mailScriptUrl, {
            method: 'post',
            body: formData
        });
        const json = await response.json();
        if (response.status === 200) {
            if(json.status === 'ok') {
                this.onSuccess(json.message);
                return true;
            }
        }
        
        this.onError(json.message);
        return false;
    }

    onSuccess (message) {
        //alert(message);
    }

    onError (message) {
        alert(message);
    }
}