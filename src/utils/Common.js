import Alert from "react-s-alert";

export default {
    alertSuccess: function(msg){
        Alert.success(msg ,{
            position: 'bottom-right',
            effect: 'scale'
          })
    }
}