y_values = [
535256870 #Total network Revenue

]
#14 = Hashrate TH whatsminer

average_14_days = ( 60 * 24 * 3600 * (40000/6.25) * 0.99 - 3000 * 24) * (1/1000)

print("14-day average of 'y' values:", average_14_days)



#(whatsminer / total network hashrate ) * btc-price * dailymined bitcoins
#310 x 18 = power usage 

# import json

# import httpx
# import asyncio
# from pprint import pprint as print

# URL = "https://api2.nicehash.com/main/api/v2/public/profcalc/devices"

# async def main():
#     async with httpx.AsyncClient() as c:
#         res = await c.get(URL)
#         json_data = res.json()
#     return parse_data(json_data)


# def parse_data(json_data: dict):
#     device_data = json_data["devices"]
#     asic_devices = [d for d in device_data if d["category"].upper() == "ASIC"]
#     btc_asics = [asic for asic in asic_devices if validate_btc_asic(asic)]
#     result = {}
#     for asic in btc_asics:
#         result[asic["name"].strip()] = {
#             "power": asic["power"],
#             "hashrate": float(json.loads(asic["speeds"])["SHA256ASICBOOST"])
#         }
#     result = sorted(result)
#     print(result)
#     return result

# def validate_btc_asic(asic_data: dict) -> bool:
#     parsed_algo_speeds = json.loads(asic_data["speeds"])
#     algos = parsed_algo_speeds.keys()
#     if "SHA256ASICBOOST" in algos:
#         if not float(parsed_algo_speeds["SHA256ASICBOOST"]) == 0:
#             return True
#     return False
    



# if __name__ == '__main__':
#     asyncio.run(main())

