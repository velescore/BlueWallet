//
//  Models.swift
//  VelesWallet
//
//  Created by Marcos Rodriguez on 11/1/20.
//  Copyright © 2020 VelesWallet. All rights reserved.
//

import Foundation

struct MarketData:Codable  {
  var nextBlock: String
  var sats: String
  var price: String
  var rate: Double
  var formattedNextBlock: String {
    return nextBlock == "..." ? "..." : #"\#(nextBlock) sat/b"#
  }
  var dateString: String = ""
  var formattedDate: String? {
    let isoDateFormatter = ISO8601DateFormatter()
    let dateFormatter = DateFormatter()
    dateFormatter.locale = Locale.current
    dateFormatter.timeStyle = .short
    
    if let date = isoDateFormatter.date(from: dateString) {
      return dateFormatter.string(from: date)
    }
    return nil
  }
  
}

struct WalletData {
  var balance: Double
  var latestTransactionTime: Int = 0
  var formattedBalanceBTC: String {
    let formatter = NumberFormatter()
    formatter.numberStyle = .none
    formatter.usesSignificantDigits = true
    formatter.maximumSignificantDigits = 9
    formatter.roundingMode = .up
    let value = NSNumber(value: balance / 100000000);
    if let valueString = formatter.string(from: value) {
      return "\(String(describing: valueString)) VLS"
    } else {
      return "0 VLS"
    }
  }

}


let emptyMarketData = MarketData(nextBlock: "...", sats: "...", price: "...", rate: 0)
let emptyWalletData = WalletData(balance: 0, latestTransactionTime: Int(Date().timeIntervalSince1970))

enum MarketDataTimeline: String {
  case Previous = "previous"
  case Current = "current"
}
