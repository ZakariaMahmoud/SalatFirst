export class Prayer {
  fajr: any;
  sunrise: any;
  dohr: any;
  asr: any;
  maghreb: any;
  ichaa: any;

  nextPrayer(selector: string): Array<any> {
    var nextPrayer: Array<any> = [];
    if (selector == 'fajr') {
      nextPrayer[0] = this.fajr;
      nextPrayer[1] = 'الفجر';
    } else if (selector == 'dohr') {
      nextPrayer[0] = this.dohr;
      nextPrayer[1] = 'الظهر';
    } else if (selector == 'asr') {
      nextPrayer[0] = this.asr;
      nextPrayer[1] = 'العصر';
    } else if (selector == 'maghreb') {
      nextPrayer[0] = this.maghreb;
      nextPrayer[1] = 'المغرب';
    } else if (selector == 'ichaa') {
      nextPrayer[0] = this.ichaa;
      nextPrayer[1] = 'العشاء';
    }

    return nextPrayer;
  }
}
