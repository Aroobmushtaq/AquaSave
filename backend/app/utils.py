# from datetime import date


# def today() -> date:
# return date.today()


# # Gamification example
# BADGE_THRESHOLDS = [100, 500, 1000, 5000] # liters saved/recorded milestones




# def calculate_badges(total_usage: int) -> list[str]:
# badges = []
# for t in BADGE_THRESHOLDS:
# if total_usage >= t:
# badges.append(f"{t}L Club")
# return badges

from datetime import date


def today() -> date:
    return date.today()


# Gamification example
BADGE_THRESHOLDS = [100, 500, 1000, 5000]  # liters saved/recorded milestones


def calculate_badges(total_usage: int) -> list[str]:
    badges = []
    for t in BADGE_THRESHOLDS:
        if total_usage >= t:
            badges.append(f"{t}L Club")
    return badges
