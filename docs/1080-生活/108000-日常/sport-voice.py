import time
import pyttsx3
from typing import Union


def generateCountdown(total: int):
    for i in range(total, 0, -1):
        start = time.perf_counter()
        engine.say(f"{i}")
        engine.runAndWait()
        while True:
            if time.perf_counter() - start >= 1:
                break


def generateSportCountDown(engine, str: str, total: int):
    lines = [f"{str}准备", "5", "4", "3", "2", "1", "开始"]
    for line in lines:
        start = time.perf_counter()
        engine.say(line)
        engine.runAndWait()
        while True:
            if time.perf_counter() - start >= 1:
                break
    generateCountdown(total)


def generateRestCountDown(engine, time: int):
    engine.say("组间休息开始")
    engine.runAndWait()
    generateCountdown(time)


def generateGroups(
    engine,
    group: list[dict[str, Union[str, int]]],
):
    lines = ["运动准备", "5", "4", "3", "2", "1", "开始"]
    for line in lines:
        start = time.perf_counter()
        engine.say(line)
        engine.runAndWait()
        while True:
            if time.perf_counter() - start >= 1:
                break

    i = 0
    for i in range(len(group)):
        item = group[i]
        name = item["name"]
        sportTime = item["sportTime"]
        restTime = item["restTime"]
        generateSportCountDown(engine, str(name), int(sportTime))
        generateRestCountDown(engine, int(restTime))


def init():
    engine = pyttsx3.init()
    engine.setProperty("volume", 1)
    engine.setProperty("rate", 300)
    return engine


if __name__ == "__main__":
    # init
    engine = init()

    template = [
        {
            "name": "壶铃摇摆",
            "sportTime": 60,
            "restTime": 30,
        },
        {
            "name": "火箭蹲",
            "sportTime": 60,
            "restTime": 30,
        },
        {
            "name": "硬拉",
            "sportTime": 60,
            "restTime": 120,
        },
        {
            "name": "壶铃摇摆",
            "sportTime": 60,
            "restTime": 30,
        },
        {
            "name": "火箭蹲",
            "sportTime": 60,
            "restTime": 30,
        },
        {
            "name": "硬拉",
            "sportTime": 60,
            "restTime": 120,
        },
        {
            "name": "壶铃摇摆",
            "sportTime": 60,
            "restTime": 30,
        },
        {
            "name": "火箭蹲",
            "sportTime": 60,
            "restTime": 30,
        },
        {
            "name": "硬拉",
            "sportTime": 60,
            "restTime": 120,
        },
    ]

    # run
    generateGroups(engine, template)

    # stop
    engine.stop()
