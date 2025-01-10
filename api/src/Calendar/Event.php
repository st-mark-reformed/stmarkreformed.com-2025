<?php

declare(strict_types=1);

namespace App\Calendar;

use DateTimeImmutable;
use RxAnte\DateImmutable;
use Spatie\Cloneable\Cloneable;

readonly class Event
{
    use Cloneable;

    public bool $isMultiDay;

    public int $totalDays;

    public function __construct(
        public string $uid,
        public string $summary,
        public string $description,
        public string $location,
        public DateTimeImmutable $startDate,
        public DateTimeImmutable $endDate,
    ) {
        $startDay = DateImmutable::createFromFormat(
            'Y-m-d 00:00:00',
            $startDate->format('Y-m-d 00:00:00'),
        );

        $endDay = DateImmutable::createFromFormat(
            'Y-m-d 00:00:00',
            $endDate->format('Y-m-d 00:00:00'),
        );

        $this->totalDays = (int) $endDay->diff($startDay)->format(
            '%a',
        );

        $this->isMultiDay = $this->totalDays > 1;
    }

    public function withStartDate(DateTimeImmutable|DateImmutable $date): Event
    {
        return $this->with(startDate: $date);
    }

    /** @return mixed[] */
    public function asScalarArray(): array
    {
        return [
            'uid' => $this->uid,
            'summary' => $this->summary,
            'description' => $this->description,
            'location' => $this->location,
            'startDate' => $this->startDate->format('Y-m-d H:i:s'),
            'endDate' => $this->endDate->format('Y-m-d H:i:s'),
            'isMultiDay' => $this->isMultiDay,
            'totalDays' => $this->totalDays,
        ];
    }
}
