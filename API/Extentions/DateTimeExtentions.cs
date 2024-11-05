using System;

namespace API.Extentions;

public static class DateTimeExtentions
{
    public static TimeSpan CalculateLastSeen(this DateTime lastSeen)
    {
        return DateTime.UtcNow - lastSeen;
    }
}
