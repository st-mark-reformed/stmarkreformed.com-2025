<?php

declare(strict_types=1);

namespace App\Profiles\Profile;

use App\EmptyUuid;
use Ramsey\Uuid\UuidInterface;
use Spatie\Cloneable\Cloneable;

use function implode;
use function trim;

readonly class Profile
{
    use Cloneable;

    public string $firstAndLastName;

    public string $fullNameWithTitle;

    public function __construct(
        public UuidInterface $id = new EmptyUuid(),
        public Photo $photo = new Photo(''),
        public TitleOrHonorific $titleOrHonorific = new TitleOrHonorific(''),
        public FirstName $firstName = new FirstName(''),
        public LastName $lastName = new LastName(''),
        public Email $email = new Email('noop@noop.noop'),
        public LeadershipPosition $leadershipPosition = LeadershipPosition::none,
        public Bio $bio = new Bio(''),
        public bool $hasMessages = false,
    ) {
        $this->firstAndLastName = $this->createFirstAndLastNameValue();

        $this->fullNameWithTitle = $this->createFullNameWithTitleValue();
    }

    private function createFirstAndLastNameValue(): string
    {
        return trim(implode(' ', [
            $this->firstName->value,
            $this->lastName->value,
        ]));
    }

    private function createFullNameWithTitleValue(): string
    {
        return trim(implode(' ', [
            $this->titleOrHonorific->value,
            $this->createFirstAndLastNameValue(),
        ]));
    }

    /** @return mixed[] */
    public function asScalarArray(
        ProfilePropertyCollection $omit = new ProfilePropertyCollection(),
    ): array {
        $values = [
            'id' => $this->id->toString(),
            'photo' => $this->photo->value,
            'titleOrHonorific' => $this->titleOrHonorific->value,
            'firstName' => $this->firstName->value,
            'lastName' => $this->lastName->value,
            'firstAndLastName' => $this->firstAndLastName,
            'fullNameWithTitle' => $this->fullNameWithTitle,
            'email' => $this->email->value,
            'leadershipPosition' => [
                'value' => $this->leadershipPosition->asScalarValue(),
                'humanReadable' => $this->leadershipPosition->humanReadable(),
            ],
            'bio' => $this->bio->value,
            'hasMessages' => $this->hasMessages,
        ];

        $omit->map(
            static function (
                ProfileProperty $property,
            ) use (&$values): void {
                unset($values[$property->name]);
            },
        );

        return $values;
    }

    public function withPhoto(string $value): Profile
    {
        return $this->with(photo: new Photo($value));
    }

    public function withTitleOrHonorific(string $value): Profile
    {
        return $this->with(titleOrHonorific: new TitleOrHonorific(
            $value,
        ));
    }

    public function withFirstName(string $value): Profile
    {
        return $this->with(firstName: new FirstName($value));
    }

    public function withLastName(string $value): Profile
    {
        return $this->with(lastName: new LastName($value));
    }

    public function withEmail(string $value): Profile
    {
        return $this->with(email: new Email($value));
    }

    public function withLeadershipPosition(string $value): Profile
    {
        return $this->with(leadershipPosition: LeadershipPosition::fromString(
            $value,
        ));
    }

    public function withBio(string $value): Profile
    {
        return $this->with(bio: new Bio($value));
    }

    public function withHasMessages(bool $value): Profile
    {
        return $this->with(hasMessages: $value);
    }
}
