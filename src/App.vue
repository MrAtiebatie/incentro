<template>
    <div id="app" class="container mt-5">
        <div class="col-8 offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 75" class="center mb-5"><path d="M15.5 59.4V9H0v65.8c8.5 0 15.5-6.9 15.5-15.4zm113.5 0h-8.1c-9.5.1-17.3-7.4-17.4-16.9s7.4-17.3 16.9-17.4H128.3c8.9 0 16.1-7.2 16.1-16.1h-23.2c-16.4 0-30.6 11.8-32.9 28C85.6 55 98 71.8 116 74.4c1.6.2 3.2.4 4.8.4h23.6c0-8.5-6.9-15.4-15.4-15.4zM80.6 41.8C80.6 23.7 65.9 9 47.8 9H25.5v65.8H41V25.1h7.1c9.4 0 17.1 7.7 17.1 17.1v32.6h15.4v-33zm265.7 17.3V41.9c0-9.5 7.7-17.1 17.1-17.1h8.1V9.1h-8.1c-18.1 0-32.8 14.7-32.8 32.8v32.9c8.6 0 15.7-7 15.7-15.7zm-76.1-17.3c0-18.1-14.7-32.8-32.8-32.8h-23.6v65.8h15.5V25.1h8.4c9.4 0 17.1 7.6 17.1 17.1v32.6h15.5v-33zm-82.4 17.6h-8.1c-3.1 0-6.2-.8-8.8-2.4 17.5-.4 31.7-14.3 32.4-31.8V9H180c-16.6 0-31 12.2-33 28.7-2.3 18 10.4 34.6 28.5 36.9 1.4.2 2.8.3 4.2.3h23.6c-.1-8.6-7-15.5-15.5-15.5zm-25-20c1.4-8.3 8.5-14.3 16.9-14.3h7.7c-.7 9.5-8.9 16.6-18.4 15.9-2.2-.1-4.3-.7-6.2-1.6zm157.5 19.7h-10c-9.4 0-17.1-7.6-17.1-17.1v-2.1h5.9c8.4 0 15.1-6.8 15.1-15.1h-21v-8.5C292.7 7.9 286 1 277.4.3V42c0 18.1 14.7 32.8 32.8 32.8h10l.1-15.7z" fill="#fe5000" id="incentro-logo-text"></path><circle id="incentro-logo-circle" data-animation="erase-circle" cx="406.4" cy="41.9" r="24.8" fill="none" stroke="#fe5000" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle></svg>

            <form action="http://www.mocky.io/v2/5d07938834000055005d9376" class="form-horizontal">
                <div class="form-group" v-if="error">
                    <div class="alert alert-warning">{{ error }}</div>
                </div>

                <div class="form-group">
                    <label class="control-label">Voorletters:</label>
                    <input type="text" class="form-control" v-model="user.initials" placeholder="Voorletters" required>
                </div>
                <div class="form-group">
                    <label class="control-label">Tussenvoegsel <small class="text-muted">(optioneel)</small>:</label>
                    <input type="text" class="form-control" v-model="user.prefix" placeholder="Tussenvoegsel">
                </div>
                <div class="form-group">
                    <label class="control-label">Achternaam:</label>
                    <input type="text" class="form-control" v-model="user.lastname" placeholder="Achternaam" required>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="control-label">Postcode:</label>
                            <input type="text" class="form-control" v-model="user.zipcode" placeholder="1234AB" required>
                        </div>

                        <div class="col-sm-6">
                            <label class="control-label">Huisnummer:</label>
                            <input type="text" class="form-control" v-model="user.street_number" @blur="findAddress" placeholder="Huisnummer" required>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label">Straatnaam:</label>
                    <input type="text" class="form-control" v-model="user.street" v-bind="{ disabled: isLoading }" placeholder="Straatnaam" required>
                </div>
                <div class="form-group">
                    <label class="control-label">Stad:</label>
                    <input type="text" class="form-control" v-model="user.city" v-bind="{ disabled: isLoading }" placeholder="Stad" required>
                </div>
                <div class="form-group">
                    <label class="control-label">E-mailadres:</label>
                    <input type="email" class="form-control" v-model="user.email" placeholder="E-mailadres" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-incentro">Gegevens versturen</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Photon from '@/resources/Photon'

export default {
    data() {
        return {
            user: {
                initials: null,
                prefix: null,
                lastname: null,
                zipcode: null,
                street_number: null,
                street: null,
                city: null,
                email: null,
            },

            isLoading: false,
            error: null,
        }
    },

    methods: {
        findAddress() {
            // Only if both fields are filled in
            if (! (this.user.zipcode && this.user.street_number)) {
                return
            }

            this.setLoader()

            // Just for the loader... ;-)
            setTimeout(() => {

                Photon.find({
                    zipcode: this.user.zipcode,
                    street_number: this.user.street_number,
                }).then(({ street, city }) => {
                    this.user.street = street
                    this.user.city = city

                    this.isLoading = false
                }).catch(() => {
                    this.error = 'Er ging iets mis met het laden van de adresgegevens.'
                })

            }, 500)
        },

        // Set loader
        setLoader() {
            this.isLoading = true
            this.user.street = 'Adres ophalen...'
            this.user.city = 'Adres ophalen...'
        }
    }
}
</script>

<style lang="scss">
    @mixin button($background-color, $text-color, $percentage: 15%) {
        background-color: $background-color;
        border-color: $background-color;
        color: $text-color;

        &:hover, &:focus, &:active:focus {
            background-color: $background-color;
            border-color: $background-color;
            color: $text-color;
        }

        &:active,
        &:focus,
        &:active:focus,
        &:active:hover {
            background-color: darken($background-color, $percentage);
            border-color: darken($background-color, $percentage);
        }
    }

    body {
        background-color: #f8f8f8 !important;
    }

    .loader {
        position: absolute;
        height: 40px;
        text-align: center;
        width: 100%;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    input.form-control:focus {
        box-shadow: 0 0 0 0.2rem #fe50006b;
        border-color: #fe5000;
    }

    .btn.btn-incentro {
        @include button(#fe5000, white);
    }
</style>
