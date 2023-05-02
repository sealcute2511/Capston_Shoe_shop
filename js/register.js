const Register = {
    init() {
        this.triggerSubmitFormRegister();
    },
    triggerSubmitFormRegister() {
        $('.btn-submit').on('click', async function (e) {
            e.preventDefault();
            const formData = Common.getFormData('#form-register');

            //check empty
            for (const name in formData) {
                const $input = $(`[name="${name}"]`);
                $input.closest('.form-group').find('.error').remove();
                if (formData[name].trim() != '') {
                    continue;
                }
                if ($input.attr('required') == 'required') {
                    $input.closest('.form-group').append('<div class="error">This field cannot empty!</div>')
                }
            }

            //check password
            if (formData.password !== formData.password_confirm) {
                $('[name="password"]').closest('.form-group').append('<div class="error">Password and Password confirm not match!</div>')
            }

            //post data
            const urlApi = Common.getApiUrl('Users/signup');
            delete formData.password_confirm;
            formData.gender = formData.gender == 'true';
            const result = await $.ajax({
                url: urlApi,
                type: 'POST',
                dataType: 'json',
                data: formData,
                contentType: "application/json",
            });
            if (typeof result.responseCode == 'undefined' || result.responseCode != 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations',
                    text: result.message
                });
                $('#form-register').trigger('reset');
                $('#form-register').find('.error').remove();
            }
        });
    }
}

Register.init();
