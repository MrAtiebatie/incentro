import Axios from 'axios'

export default {
    /**
     * Find street and city
     * @param  {string} options.zipcode
     * @param  {string} options.street_number
     * @return {Promise}
     */
    find({ zipcode, street_number }) {
        return new Promise((resolve, reject) => {

            // Create API request
            Axios.get(`http://photon.komoot.de/api/?q=${zipcode} ${street_number}&limit=1`)
                .then(({ data }) => {
                    if (data.features.length > 0) {
                        const properties = data.features[0].properties

                        resolve({
                            street: properties.street,
                            city: properties.city,
                        })
                    } else {
                        reject(data)
                    }
                })
                .catch(({ data }) => {
                    reject(data)
                })
        })
    }
}