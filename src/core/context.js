import i18n from './i18n';

export default function Context (){

    this.culture = 'en';
    this.i18n = i18n[this.culture];
    
}